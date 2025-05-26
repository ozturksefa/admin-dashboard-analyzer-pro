
import React from 'react';
import { cn } from '@/lib/utils';

interface TimeFilterProps {
  activeFilter: 'daily' | 'weekly' | 'monthly';
  onChange: (filter: 'daily' | 'weekly' | 'monthly') => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ activeFilter, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {['daily', 'weekly', 'monthly'].map((filter) => (
        <button
          key={filter}
          className={cn(
            "px-4 py-1.5 text-sm rounded-md transition-colors border",
            activeFilter === filter
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
          onClick={() => onChange(filter as 'daily' | 'weekly' | 'monthly')}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
