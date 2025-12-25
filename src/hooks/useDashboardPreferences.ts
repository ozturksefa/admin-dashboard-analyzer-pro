
import { useState, useEffect, useCallback } from 'react';

export interface DashboardPreferences {
  timeFilter: 'daily' | 'weekly' | 'monthly';
  autoRefreshEnabled: boolean;
  autoRefreshInterval: number;
  widgetOrder: string[];
  collapsedWidgets: string[];
}

const DEFAULT_PREFERENCES: DashboardPreferences = {
  timeFilter: 'daily',
  autoRefreshEnabled: false,
  autoRefreshInterval: 30,
  widgetOrder: [
    'quick-actions',
    'system-health',
    'stats',
    'charts',
    'top-processes-queues',
    'recent-alerts',
    'performance-trends',
    'ai-recommendations'
  ],
  collapsedWidgets: [],
};

const STORAGE_KEY = 'dashboard-preferences';

export const useDashboardPreferences = () => {
  const [preferences, setPreferencesState] = useState<DashboardPreferences>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
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

  const resetPreferences = useCallback(() => {
    setPreferencesState(DEFAULT_PREFERENCES);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    preferences,
    setPreference,
    setWidgetOrder,
    toggleWidgetCollapse,
    resetPreferences,
  };
};
