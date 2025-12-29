
import React from 'react';
import { RefreshCcw, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TimeFilter from './TimeFilter';
import DateRangePicker, { DateRange } from './DateRangePicker';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  timeFilter: 'daily' | 'weekly' | 'monthly';
  onTimeFilterChange: (filter: 'daily' | 'weekly' | 'monthly') => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  isAutoRefreshEnabled: boolean;
  countdown: number;
  lastRefresh: Date | null;
  onAutoRefreshToggle: () => void;
  onRefresh: () => void;
  onResetPreferences: () => void;
  title?: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeFilter,
  onTimeFilterChange,
  dateRange,
  onDateRangeChange,
  isAutoRefreshEnabled,
  countdown,
  lastRefresh,
  onAutoRefreshToggle,
  onRefresh,
  onResetPreferences,
  title = "Welcome, Admin",
  subtitle = "Here's what's happening with your automation processes",
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Top row: Title and Theme */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Bottom row: Filters and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-card border border-border">
        {/* Left side: Time Filter & Date Range */}
        <div className="flex flex-wrap items-center gap-3">
          <TimeFilter activeFilter={timeFilter} onChange={onTimeFilterChange} />
          <div className="h-6 w-px bg-border hidden sm:block" />
          <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
        </div>

        {/* Right side: Refresh Controls */}
        <div className="flex items-center gap-2">
          {/* Auto Refresh Toggle */}
          <Button
            variant={isAutoRefreshEnabled ? "default" : "outline"}
            size="sm"
            onClick={onAutoRefreshToggle}
            className={cn(
              "gap-2 transition-all",
              isAutoRefreshEnabled && "bg-green-600 hover:bg-green-700"
            )}
          >
            <RefreshCcw className={cn("h-4 w-4", isAutoRefreshEnabled && "animate-spin")} />
            {isAutoRefreshEnabled ? `${countdown}s` : 'Auto'}
          </Button>

          {/* Manual Refresh */}
          <Button
            variant="default"
            size="sm"
            onClick={onRefresh}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>

          {/* Reset */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onResetPreferences}
            title="Reset layout"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          {/* Last Refresh Time */}
          {lastRefresh && (
            <span className="text-xs text-muted-foreground hidden lg:block">
              Last: {lastRefresh.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
