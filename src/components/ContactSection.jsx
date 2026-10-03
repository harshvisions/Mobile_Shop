import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="w-full relative bg-transparent border-t border-white/10 pt-20 pb-12" id="contact">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">Get in touch.</h2>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              Have questions about the latest models or want to reserve your device? We're here to help you experience the best of Apple.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <span className="font-medium">+91 98765 43210</span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <span className="font-medium">hello@mobileshop.com</span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="font-medium">123 Tech Avenue, New Delhi, India</span>
              </div>
            </div>
          </div>
          
          {/* Quick Form */}
          <div className="glass-panel p-8">
            <h3 className="text-xl font-bold mb-6 text-white">Send a Message</h3>
            <form className="space-y-4 flex flex-col">
              <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
              <input type="email" placeholder="Your Email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
              <textarea placeholder="How can we help you?" rows="4" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"></textarea>
              <button type="button" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-2">
                Send Message
              </button>
            </form>
          </div>
          
        </div>
        
        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-gray-400 text-sm">
          <p>© 2026 Mobile Shop. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
