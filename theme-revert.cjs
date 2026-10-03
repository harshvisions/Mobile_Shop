const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /bg-\[#f5f5f7\]/g, replacement: 'bg-[#050505]' },
  { regex: /text-\[#1d1d1f\]/g, replacement: 'text-white' },
  { regex: /text-gray-600/g, replacement: 'text-gray-300' },
  { regex: /text-gray-500/g, replacement: 'text-gray-400' },
  { regex: /border-black\/10/g, replacement: 'border-white/10' },
  { regex: /border-black\/20/g, replacement: 'border-white/20' },
  { regex: /border-black\/30/g, replacement: 'border-white/30' },
  { regex: /border-black(?![\/])/g, replacement: 'border-white' }, // Negative lookahead so it doesn't break border-black/10 if run out of order
  { regex: /hover:text-black/g, replacement: 'hover:text-white' },
  { regex: /hover:bg-black\/5/g, replacement: 'hover:bg-white/10' },
  { regex: /bg-white\/70/g, replacement: 'bg-black/40' },
  { regex: /bg-white\/80/g, replacement: 'bg-black/50' },
  { regex: /bg-white\/90/g, replacement: 'bg-black/80' },
  { regex: /bg-white(?![\/])/g, replacement: 'bg-black' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const { regex, replacement } of replacements) {
        newContent = newContent.replace(regex, replacement);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Reverted ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Revert Done!');
