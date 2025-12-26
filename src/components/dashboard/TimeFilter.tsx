
import React from 'react';
import { cn } from '@/lib/utils';

interface TimeFilterProps {
  activeFilter: 'daily' | 'weekly' | 'monthly';
  onChange: (filter: 'daily' | 'weekly' | 'monthly') => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ activeFilter, onChange }) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {(['daily', 'weekly', 'monthly'] as const).map((filter) => (
        <button
          key={filter}
          className={cn(
            "px-3 py-1.5 text-sm rounded-md transition-all font-medium",
            activeFilter === filter
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
          onClick={() => onChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;

