
import { useState, useEffect, useCallback } from 'react';
import { subDays, startOfDay, endOfDay } from 'date-fns';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DashboardPreferences {
  timeFilter: 'daily' | 'weekly' | 'monthly';
  autoRefreshEnabled: boolean;
  autoRefreshInterval: number;
  widgetOrder: string[];
  collapsedWidgets: string[];
  dateRange: DateRange;
}

const getDefaultDateRange = (): DateRange => ({
  from: startOfDay(subDays(new Date(), 6)),
  to: endOfDay(new Date()),
});

const DEFAULT_PREFERENCES: DashboardPreferences = {
  timeFilter: 'daily',
  autoRefreshEnabled: false,
  autoRefreshInterval: 30,
  widgetOrder: [
    'stats',
    'charts',
    'top-processes-queues',
    'performance-trends',
    'ai-recommendations'
  ],
  collapsedWidgets: [],
  dateRange: getDefaultDateRange(),
};

const STORAGE_KEY = 'dashboard-preferences';

export const useDashboardPreferences = () => {
const [preferences, setPreferencesState] = useState<DashboardPreferences>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects
          if (parsed.dateRange) {
            parsed.dateRange = {
              from: new Date(parsed.dateRange.from),
              to: new Date(parsed.dateRange.to),
            };
          }
          return { ...DEFAULT_PREFERENCES, ...parsed };
        } catch {
          return DEFAULT_PREFERENCES;
        }
      }
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const setPreference = useCallback(<K extends keyof DashboardPreferences>(
    key: K,
    value: DashboardPreferences[K]
  ) => {
    setPreferencesState(prev => ({ ...prev, [key]: value }));
  }, []);

  const setWidgetOrder = useCallback((newOrder: string[]) => {
    setPreferencesState(prev => ({ ...prev, widgetOrder: newOrder }));
  }, []);

  const toggleWidgetCollapse = useCallback((widgetId: string) => {
    setPreferencesState(prev => ({
      ...prev,
      collapsedWidgets: prev.collapsedWidgets.includes(widgetId)
        ? prev.collapsedWidgets.filter(id => id !== widgetId)
        : [...prev.collapsedWidgets, widgetId]
    }));
  }, []);

  const setDateRange = useCallback((dateRange: DateRange) => {
    setPreferencesState(prev => ({ ...prev, dateRange }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferencesState({ ...DEFAULT_PREFERENCES, dateRange: getDefaultDateRange() });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    preferences,
    setPreference,
    setWidgetOrder,
    toggleWidgetCollapse,
    setDateRange,
    resetPreferences,
  };
};
