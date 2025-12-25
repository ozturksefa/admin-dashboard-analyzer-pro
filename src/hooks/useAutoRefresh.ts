
import { useState, useEffect, useCallback } from 'react';

interface UseAutoRefreshOptions {
  interval?: number; // in seconds
  enabled?: boolean;
}

export const useAutoRefresh = (options: UseAutoRefreshOptions = {}) => {
  const { interval = 30, enabled: initialEnabled = false } = options;
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(interval);

  const refresh = useCallback(() => {
    setLastRefresh(new Date());
    setCountdown(interval);
  }, [interval]);

  const toggle = useCallback(() => {
    setIsEnabled(prev => !prev);
    if (!isEnabled) {
      setCountdown(interval);
    }
  }, [isEnabled, interval]);

  useEffect(() => {
    if (!isEnabled) return;

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          refresh();
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [isEnabled, interval, refresh]);

  return {
    isEnabled,
    toggle,
    refresh,
    lastRefresh,
    countdown,
  };
};
