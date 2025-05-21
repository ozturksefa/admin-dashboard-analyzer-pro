
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full h-[60px] bg-white border-t border-[#E5E5E5] flex items-center justify-between px-8">
      <span className="text-sm text-[#A3A3A3]">© 2025 AdminApp</span>
      <span className="text-sm text-[#A3A3A3] flex items-center">
        Powered by 
        <Heart size={14} className="mx-1 text-[#A3A3A3]" />
      </span>
    </footer>
  );
};

export default Footer;
