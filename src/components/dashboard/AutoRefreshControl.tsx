
import React from 'react';
import { RefreshCcw, Clock, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AutoRefreshControlProps {
  isEnabled: boolean;
  countdown: number;
  lastRefresh: Date;
  onToggle: () => void;
  onRefresh: () => void;
}

const AutoRefreshControl: React.FC<AutoRefreshControlProps> = ({
  isEnabled,
  countdown,
  lastRefresh,
  onToggle,
  onRefresh,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="h-4 w-4" />
        <span>Last: {formatTime(lastRefresh)}</span>
      </div>
      
      <div className="h-4 w-px bg-gray-300" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className={cn(
          "gap-2 h-8",
          isEnabled ? "text-green-600 hover:text-green-700" : "text-gray-600"
        )}
      >
        {isEnabled ? (
          <>
            <Pause className="h-4 w-4" />
            <span className="font-medium">{countdown}s</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            <span>Auto</span>
          </>
        )}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        className="gap-2 h-8"
      >
        <RefreshCcw className="h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
};

export default AutoRefreshControl;
