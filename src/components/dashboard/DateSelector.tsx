
import React from 'react';
import { Calendar, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DateSelectorProps {
  date: string;
  onRefresh: () => void;
}

const DateSelector = ({ date, onRefresh }: DateSelectorProps) => {
  return (
    <div className="flex gap-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 text-sm font-normal"
      >
        <Calendar size={16} className="text-gray-500" />
        <span>{date}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </Button>
      
      <Button 
        variant="default"
        className="flex items-center gap-2 text-sm bg-gray-900 hover:bg-gray-800"
        onClick={onRefresh}
      >
        <RefreshCcw size={16} />
        <span>Refresh</span>
      </Button>
    </div>
  );
};

export default DateSelector;
