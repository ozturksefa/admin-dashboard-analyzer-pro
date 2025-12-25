
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full h-[60px] bg-card border-t border-border flex items-center justify-between px-4 md:px-8">
      <span className="text-sm text-muted-foreground">© 2025 Nisus Central</span>
      <span className="text-sm text-muted-foreground flex items-center">
        Powered by 
        <Heart size={14} className="mx-1 text-muted-foreground" />
      </span>
    </footer>
  );
};

export default Footer;
