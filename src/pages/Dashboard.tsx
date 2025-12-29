
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Bot, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  RefreshCcw,
  Lightbulb,
  ChevronRight,
  ArrowUp,
  ExternalLink,
  PieChart,
  LineChart,
  Sparkles,
  DollarSign,
  Clock,
  BarChart3,
  Building2,
  Target
} from 'lucide-react';
import { DonutChart, TrendChart, BarChartComponent } from '../components/dashboard/Charts';
import { 
  ROITrendChart, 
  DepartmentSavingsChart, 
  FTESavingsChart, 
  PerformanceGaugeChart,
  TransactionsVolumeChart 
} from '../components/dashboard/ExecutiveCharts';
import ExecutiveSummary from '../components/dashboard/ExecutiveSummary';
import TopProcesses from '../components/dashboard/TopProcesses';
import TopQueues from '../components/dashboard/TopQueues';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DraggableWidget from '../components/dashboard/DraggableWidget';
import { useAutoRefresh } from '../hooks/useAutoRefresh';
import { useDashboardPreferences } from '../hooks/useDashboardPreferences';

const Dashboard = () => {
  const navigate = useNavigate();
  const { preferences, setPreference, setWidgetOrder, toggleWidgetCollapse, setDateRange, resetPreferences } = useDashboardPreferences();
  const { isEnabled, toggle, refresh, lastRefresh, countdown } = useAutoRefresh({ 
    interval: preferences.autoRefreshInterval,
    enabled: preferences.autoRefreshEnabled 
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = preferences.widgetOrder.indexOf(active.id as string);
      const newIndex = preferences.widgetOrder.indexOf(over.id as string);
      setWidgetOrder(arrayMove(preferences.widgetOrder, oldIndex, newIndex));
    }
  };

  const handleRefresh = () => {
    refresh();
    setRefreshKey(prev => prev + 1);
  };

  const handleTimeFilterChange = (filter: 'daily' | 'weekly' | 'monthly') => {
    setPreference('timeFilter', filter);
  };

  const aiSuggestions = [
    {
      id: 1,
      process: "Invoice Processing",
      suggestion: "Increase robot capacity to reduce processing time by 25%",
      confidence: 95,
      category: "Performance",
      impact: "High",
      estimatedSaving: "$15K/month"
    },
    {
      id: 2,
      process: "Data Migration",
      suggestion: "Implement parallel processing to boost throughput by 40%",
      confidence: 87,
      category: "Efficiency",
      impact: "Medium",
      estimatedSaving: "$8K/month"
    },
    {
      id: 3,
      process: "Report Generation",
      suggestion: "Add caching mechanism to improve response time by 60%",
      confidence: 78,
      category: "Optimization",
      impact: "Medium",
      estimatedSaving: "$12K/month"
    }
  ];

  const renderWidget = (widgetId: string) => {
    const isCollapsed = preferences.collapsedWidgets.includes(widgetId);
    
    switch (widgetId) {
      case 'stats':
        return (
          <div key={widgetId}>
            <ExecutiveSummary timeFilter={preferences.timeFilter} />
          </div>
        );
      
      case 'charts':
        return (
          <div key={widgetId} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableWidget
              id="chart-roi-trend"
              title="ROI & Cost Savings Trend"
              icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-roi-trend')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-roi-trend')}
            >
              <div className="h-[320px]">
                <ROITrendChart timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
            
            <DraggableWidget
              id="chart-dept-savings"
              title="Cost Savings by Department"
              icon={<Building2 className="h-5 w-5 text-blue-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-dept-savings')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-dept-savings')}
            >
              <div className="h-[320px]">
                <DepartmentSavingsChart timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
          </div>
        );
      
      case 'top-processes-queues':
        return (
          <div key={widgetId} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableWidget
              id="chart-fte-savings"
              title="FTE Hours Saved by Category"
              icon={<Clock className="h-5 w-5 text-indigo-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-fte-savings')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-fte-savings')}
            >
              <div className="h-[320px]">
                <FTESavingsChart timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
            
            <DraggableWidget
              id="chart-transactions"
              title="Transactions Volume & Value"
              icon={<BarChart3 className="h-5 w-5 text-amber-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-transactions')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-transactions')}
            >
              <div className="h-[320px]">
                <TransactionsVolumeChart timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
          </div>
        );
      
      case 'performance-trends':
        return (
          <div key={widgetId} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DraggableWidget
              id="chart-performance"
              title="Automation Performance Metrics"
              icon={<Target className="h-5 w-5 text-purple-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-performance')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-performance')}
            >
              <div className="h-[280px]">
                <PerformanceGaugeChart timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
            
            <DraggableWidget
              id="top-processes"
              title="Top Performing Processes"
              isCollapsed={preferences.collapsedWidgets.includes('top-processes')}
              onToggleCollapse={() => toggleWidgetCollapse('top-processes')}
              headerActions={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-blue-600 hover:text-blue-700"
                  onClick={() => navigate('/processes')}
                >
                  View All
                  <ExternalLink className="h-3 w-3" />
                </Button>
              }
            >
              <TopProcesses timeFilter={preferences.timeFilter} />
            </DraggableWidget>
            
            <DraggableWidget
              id="top-queues"
              title="Queue Performance"
              isCollapsed={preferences.collapsedWidgets.includes('top-queues')}
              onToggleCollapse={() => toggleWidgetCollapse('top-queues')}
              headerActions={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-blue-600 hover:text-blue-700"
                  onClick={() => navigate('/queues')}
                >
                  View All
                  <ExternalLink className="h-3 w-3" />
                </Button>
              }
            >
              <TopQueues timeFilter={preferences.timeFilter} />
            </DraggableWidget>
          </div>
        );
      
      case 'ai-recommendations':
        return (
          <DraggableWidget
            key={widgetId}
            id={widgetId}
            title="AI-Powered ROI Optimization Recommendations"
            icon={
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-600 rounded flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
            }
            isCollapsed={isCollapsed}
            onToggleCollapse={() => toggleWidgetCollapse(widgetId)}
            headerActions={
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            }
          >
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className="group p-4 border border-border rounded-lg hover:shadow-md hover:border-muted transition-all duration-200 cursor-pointer bg-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{suggestion.process}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                            {suggestion.category}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            suggestion.impact === 'High' 
                              ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' 
                              : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                          }`}>
                            {suggestion.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${
                          suggestion.confidence >= 90 
                            ? 'text-emerald-600' 
                            : suggestion.confidence >= 70 
                            ? 'text-amber-600' 
                            : 'text-rose-600'
                        }`}>
                          {suggestion.confidence}% Confidence
                        </div>
                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          {suggestion.estimatedSaving}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {suggestion.suggestion}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">Potential ROI improvement</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900">
                      Implement Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg border border-emerald-100 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Unlock More Savings</h4>
                    <p className="text-sm text-muted-foreground">Get AI-powered insights to maximize your automation ROI</p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0">
                  Generate Report
                </Button>
              </div>
            </div>
          </DraggableWidget>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <DashboardHeader
        timeFilter={preferences.timeFilter}
        onTimeFilterChange={handleTimeFilterChange}
        dateRange={preferences.dateRange}
        onDateRangeChange={setDateRange}
        isAutoRefreshEnabled={isEnabled}
        countdown={countdown}
        lastRefresh={lastRefresh}
        onAutoRefreshToggle={toggle}
        onRefresh={handleRefresh}
        onResetPreferences={resetPreferences}
      />

      {/* Widgets */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={preferences.widgetOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {preferences.widgetOrder.map(widgetId => renderWidget(widgetId))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Dashboard;
