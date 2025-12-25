
import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from './dashboard/ThemeToggle';

const Header = () => {
  return (
    <header className="w-full h-[72px] bg-card border-b border-border flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center">
          <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center text-primary-foreground mr-3">
            <span className="font-medium">N</span>
          </div>
          <span className="text-lg font-medium text-foreground">Nisus Central</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[250px] h-[38px] bg-muted border border-border rounded-md pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell size={18} className="text-muted-foreground" />
        </Button>
        
        <ThemeToggle />
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
