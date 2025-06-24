
import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="w-full h-[72px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center">
          <div className="w-9 h-9 bg-[#262626] rounded-md flex items-center justify-center text-white mr-3">
            <span className="font-medium">N</span>
          </div>
          <span className="text-lg font-medium text-[#171717]">Nisus Central RPA</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[250px] h-[38px] bg-[#F5F5F5] border border-[#E5E5E5] rounded-md pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell size={18} className="text-[#737373]" />
        </Button>
        
        <Button
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <Sun size={18} className="text-[#737373]" />
          ) : (
            <Moon size={18} className="text-[#737373]" />
          )}
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
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
