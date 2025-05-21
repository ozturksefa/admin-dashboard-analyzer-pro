
import React from 'react';
import { Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full h-[72px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-8">
      <div className="flex items-center">
        <div className="w-9 h-9 bg-[#262626] rounded flex items-center justify-center text-white mr-4">
          L
        </div>
        <span className="text-lg font-normal text-[#171717]">AdminApp</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-[170px] h-[38px] bg-[#F5F5F5] border border-[#E5E5E5] rounded pl-9 pr-2 text-sm"
          />
          <Search className="absolute left-2 top-[11px] h-4 w-4 text-[#A3A3A3]" />
        </div>
        
        <Bell size={18} className="text-[#737373]" />
        <MessageSquare size={18} className="text-[#737373]" />
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-normal text-[#171717]">Jane Doe</span>
            <span className="text-xs font-normal text-[#737373]">Admin</span>
          </div>
          <ChevronDown size={12} className="text-[#A3A3A3]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
