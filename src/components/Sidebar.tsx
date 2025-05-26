
import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarItems, adminItems } from '../utils/icons';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  return (
    <aside className="w-[260px] h-full bg-white border-r border-[#E5E5E5] flex-shrink-0 hidden md:block">
      <div className="p-4">
        <div className="flex items-center gap-2 py-2 px-2 rounded-lg bg-gray-50 mb-4">
          <span className="w-9 h-9 bg-[#262626] rounded-lg flex items-center justify-center text-white font-medium">
            D
          </span>
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-900">Default Tenant</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
        
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.title}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive ? "bg-[#F5F5F5] text-[#171717] font-medium" : "text-[#404040] hover:bg-gray-50"
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
          <p className="text-xs font-medium text-gray-500 px-3 mb-2">ADMINISTRATION</p>
          <nav className="space-y-1">
            {adminItems.map((item) => (
              <NavLink 
                key={item.title}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive ? "bg-[#F5F5F5] text-[#171717] font-medium" : "text-[#404040] hover:bg-gray-50"
                )}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
