const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /bg-\[#050505\]/g, replacement: 'bg-[#f5f5f7]' },
  { regex: /text-white/g, replacement: 'text-[#1d1d1f]' },
  { regex: /text-gray-300/g, replacement: 'text-gray-600' },
  { regex: /text-gray-400/g, replacement: 'text-gray-500' },
  { regex: /border-white\/10/g, replacement: 'border-black/10' },
  { regex: /border-white\/20/g, replacement: 'border-black/20' },
  { regex: /border-white\/30/g, replacement: 'border-black/30' },
  { regex: /border-white/g, replacement: 'border-black' },
  { regex: /hover:text-white/g, replacement: 'hover:text-black' },
  { regex: /hover:bg-white\/10/g, replacement: 'hover:bg-black/5' },
  { regex: /bg-black\/40/g, replacement: 'bg-white/70' },
  { regex: /bg-black\/50/g, replacement: 'bg-white/80' },
  { regex: /bg-black\/60/g, replacement: 'bg-white/90' },
  { regex: /bg-black\/80/g, replacement: 'bg-white/90' },
  { regex: /bg-black/g, replacement: 'bg-white' },
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
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done!');
