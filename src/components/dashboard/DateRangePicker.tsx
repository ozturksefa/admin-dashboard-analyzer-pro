
import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format, subDays, subWeeks, subMonths, startOfDay, endOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const presets = [
  { label: 'Today', getValue: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { label: 'Yesterday', getValue: () => ({ from: startOfDay(subDays(new Date(), 1)), to: endOfDay(subDays(new Date(), 1)) }) },
  { label: 'Last 7 days', getValue: () => ({ from: startOfDay(subDays(new Date(), 6)), to: endOfDay(new Date()) }) },
  { label: 'Last 30 days', getValue: () => ({ from: startOfDay(subDays(new Date(), 29)), to: endOfDay(new Date()) }) },
  { label: 'This week', getValue: () => ({ from: startOfDay(subWeeks(new Date(), 0)), to: endOfDay(new Date()) }) },
  { label: 'This month', getValue: () => ({ from: startOfDay(subMonths(new Date(), 0)), to: endOfDay(new Date()) }) },
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetClick = (preset: typeof presets[0]) => {
    onDateRangeChange(preset.getValue());
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      if (format(dateRange.from, 'yyyy-MM-dd') === format(dateRange.to, 'yyyy-MM-dd')) {
        return format(dateRange.from, 'd MMM yyyy', { locale: tr });
      }
      return `${format(dateRange.from, 'd MMM', { locale: tr })} - ${format(dateRange.to, 'd MMM yyyy', { locale: tr })}`;
    }
    return 'Select date range';
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal gap-2 min-w-[200px] bg-card border-border hover:bg-accent"
          )}
        >
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{formatDateRange()}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Presets */}
          <div className="border-r border-border p-2 space-y-1 min-w-[140px]">
            <p className="text-xs font-medium text-muted-foreground px-2 py-1">Quick Select</p>
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm font-normal"
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          
          {/* Calendar */}
          <div className="p-3">
            <CalendarComponent
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onDateRangeChange({ from: range.from, to: range.to });
                } else if (range?.from) {
                  onDateRangeChange({ from: range.from, to: range.from });
                }
              }}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
