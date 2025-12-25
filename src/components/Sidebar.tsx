
import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebarItems, adminItems } from '../utils/icons';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  return (
    <aside className="w-[260px] h-full bg-card border-r border-border flex-shrink-0 hidden md:block">
      <div className="p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.title}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground px-3 mb-2">ADMINISTRATION</p>
          <nav className="space-y-1">
            {adminItems.map((item) => (
              <NavLink 
                key={item.title}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
