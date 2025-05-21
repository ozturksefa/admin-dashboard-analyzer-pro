
import React from 'react';
import { LayoutDashboard, Users, Settings, LogOut, Briefcase, Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-[260px] h-full bg-white border-r border-[#F5F5F5]">
      <nav className="p-4 flex flex-col h-full">
        <div className="space-y-1 flex-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 text-base rounded-lg ${
                isActive 
                  ? 'bg-[#F5F5F5] font-medium text-[#171717]' 
                  : 'text-[#404040] hover:bg-gray-50'
              }`
            }
          >
            <LayoutDashboard size={16} className="mr-6" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/robots" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 text-base rounded-lg ${
                isActive 
                  ? 'bg-[#F5F5F5] font-medium text-[#171717]' 
                  : 'text-[#404040] hover:bg-gray-50'
              }`
            }
          >
            <Users size={16} className="mr-6" />
            Robots
          </NavLink>
          
          <NavLink 
            to="/jobs" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 text-base rounded-lg ${
                isActive 
                  ? 'bg-[#F5F5F5] font-medium text-[#171717]' 
                  : 'text-[#404040] hover:bg-gray-50'
              }`
            }
          >
            <Briefcase size={16} className="mr-6" />
            Jobs
          </NavLink>
          
          <NavLink 
            to="/schedules" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 text-base rounded-lg ${
                isActive 
                  ? 'bg-[#F5F5F5] font-medium text-[#171717]' 
                  : 'text-[#404040] hover:bg-gray-50'
              }`
            }
          >
            <Calendar size={16} className="mr-6" />
            Schedules
          </NavLink>
          
          <NavLink 
            to="/users" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 text-base rounded-lg ${
                isActive 
                  ? 'bg-[#F5F5F5] font-medium text-[#171717]' 
                  : 'text-[#404040] hover:bg-gray-50'
              }`
            }
          >
            <Users size={16} className="mr-6" />
            Users
          </NavLink>

          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 text-base rounded-lg mt-6 ${
                isActive 
                  ? 'bg-[#F5F5F5] font-medium text-[#171717]' 
                  : 'text-[#404040] hover:bg-gray-50'
              }`
            }
          >
            <Settings size={16} className="mr-6" />
            Settings
          </NavLink>
        </div>
        
        <div className="mt-auto pt-4">
          <button className="flex items-center px-3 py-2 text-sm text-[#737373] hover:bg-gray-50 w-full rounded-lg">
            <LogOut size={14} className="mr-[22px]" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
