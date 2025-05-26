
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bot, 
  Briefcase, 
  Calendar, 
  Play, 
  ListOrdered, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Robots", href: "/robots", icon: Bot },
  { title: "Jobs", href: "/jobs", icon: Briefcase },
  { title: "Schedules", href: "/schedules", icon: Calendar },
  { title: "Processes", href: "/processes", icon: Play },
  { title: "Queues", href: "/queues", icon: ListOrdered },
  { title: "Users", href: "/users", icon: Users },
  { title: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-[260px] h-full bg-white border-r border-[#E5E5E5] flex-shrink-0 hidden md:block">
      <div className="p-4">
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
        
        <div className="mt-8 pt-4 border-t border-[#E5E5E5]">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors">
            <LogOut size={18} className="flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
