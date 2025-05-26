
import React, { useState } from 'react';
import { Search, Bell, RefreshCcw, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onRefresh: () => void;
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

const Header = ({ onRefresh, dateRange, onDateRangeChange }: HeaderProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <header className="w-full h-[72px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 md:px-8">
      {/* Left Section - Logo and Search */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#262626] rounded-md flex items-center justify-center text-white">
            <span className="font-medium">N</span>
          </div>
          <span className="text-lg font-medium text-[#171717] hidden md:block">Nisus Centrap RPA</span>
        </div>
        
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
          <input
            type="text"
            placeholder="Search robots, jobs, processes..."
            className="w-[320px] h-[38px] bg-[#F5F5F5] border border-[#E5E5E5] rounded-md pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>
      
      {/* Right Section - Controls and User */}
      <div className="flex items-center gap-3">
        {/* Date Range Picker */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-[38px] px-3 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {format(dateRange.from, "d MMM")} - {format(dateRange.to, "d MMM yyyy")}
              </span>
              <span className="sm:hidden">
                {format(dateRange.from, "MMM d")}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onDateRangeChange({ from: range.from, to: range.to });
                  setCalendarOpen(false);
                }
              }}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          className="h-[38px] w-[38px]"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
        
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="rounded-full h-[38px] w-[38px]">
          <Bell size={18} className="text-[#737373]" />
        </Button>
        
        {/* User Section */}
        <div className="flex items-center gap-3 ml-2">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium text-gray-900">Jane Doe</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/women/32.jpg" 
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
