
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
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Database,
  BarChart3,
  Activity,
  RefreshCcw,
  Lightbulb,
  ChevronRight,
  ArrowUp,
  ExternalLink,
  PieChart,
  LineChart,
  Sparkles
} from 'lucide-react';
import { DonutChart, TrendChart, BarChartComponent } from '../components/dashboard/Charts';
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

  const statsData = useMemo(() => ({
    daily: [
      { title: "Total Robots", value: "42", change: "+8%", isPositive: true, icon: Bot, iconColor: "#262626" },
      { title: "Active Jobs", value: "12", change: "+12%", isPositive: true, icon: Activity, iconColor: "#3B82F6" },
      { title: "Failed Jobs", value: "3", change: "+2%", isPositive: false, icon: AlertCircle, iconColor: "#EF4444" },
      { title: "Queue Items", value: "256", change: "-5%", isPositive: true, icon: Clock, iconColor: "#F59E0B" },
      { title: "FTE Saving", value: "8h", change: "+15%", isPositive: true, icon: TrendingUp, iconColor: "#10B981" },
      { title: "Transaction Count", value: "487", change: "+7%", isPositive: true, icon: Database, iconColor: "#8B5CF6" },
      { title: "Total Runtime", value: "24h", change: "+5%", isPositive: true, icon: Clock, iconColor: "#06B6D4" },
      { title: "Robot Utilization", value: "82%", change: "+3%", isPositive: true, icon: BarChart3, iconColor: "#6366F1" },
    ],
    weekly: [
      { title: "Total Robots", value: "42", change: "+5%", isPositive: true, icon: Bot, iconColor: "#262626" },
      { title: "Active Jobs", value: "78", change: "+18%", isPositive: true, icon: Activity, iconColor: "#3B82F6" },
      { title: "Failed Jobs", value: "12", change: "-3%", isPositive: true, icon: AlertCircle, iconColor: "#EF4444" },
      { title: "Queue Items", value: "1,456", change: "+8%", isPositive: false, icon: Clock, iconColor: "#F59E0B" },
      { title: "FTE Saving", value: "56h", change: "+22%", isPositive: true, icon: TrendingUp, iconColor: "#10B981" },
      { title: "Transaction Count", value: "3,245", change: "+12%", isPositive: true, icon: Database, iconColor: "#8B5CF6" },
      { title: "Total Runtime", value: "168h", change: "+8%", isPositive: true, icon: Clock, iconColor: "#06B6D4" },
      { title: "Robot Utilization", value: "78%", change: "-2%", isPositive: false, icon: BarChart3, iconColor: "#6366F1" },
    ],
    monthly: [
      { title: "Total Robots", value: "42", change: "+12%", isPositive: true, icon: Bot, iconColor: "#262626" },
      { title: "Active Jobs", value: "342", change: "+25%", isPositive: true, icon: Activity, iconColor: "#3B82F6" },
      { title: "Failed Jobs", value: "45", change: "-8%", isPositive: true, icon: AlertCircle, iconColor: "#EF4444" },
      { title: "Queue Items", value: "6,234", change: "+15%", isPositive: false, icon: Clock, iconColor: "#F59E0B" },
      { title: "FTE Saving", value: "240h", change: "+35%", isPositive: true, icon: TrendingUp, iconColor: "#10B981" },
      { title: "Transaction Count", value: "14,567", change: "+18%", isPositive: true, icon: Database, iconColor: "#8B5CF6" },
      { title: "Total Runtime", value: "720h", change: "+10%", isPositive: true, icon: Clock, iconColor: "#06B6D4" },
      { title: "Robot Utilization", value: "85%", change: "+5%", isPositive: true, icon: BarChart3, iconColor: "#6366F1" },
    ],
  }), []);

  const stats = statsData[preferences.timeFilter];

  const aiSuggestions = [
    {
      id: 1,
      process: "Invoice Processing",
      suggestion: "Increase robot capacity to reduce processing time by 25%",
      confidence: 95,
      category: "Performance",
      impact: "High",
      estimatedSaving: "15 hours/week"
    },
    {
      id: 2,
      process: "Data Migration",
      suggestion: "Implement parallel processing to boost throughput by 40%",
      confidence: 87,
      category: "Efficiency",
      impact: "Medium",
      estimatedSaving: "8 hours/week"
    },
    {
      id: 3,
      process: "Report Generation",
      suggestion: "Add caching mechanism to improve response time by 60%",
      confidence: 78,
      category: "Optimization",
      impact: "Medium",
      estimatedSaving: "12 hours/week"
    }
  ];

  const getPeriodLabel = () => {
    switch (preferences.timeFilter) {
      case 'daily': return 'vs yesterday';
      case 'weekly': return 'vs last week';
      case 'monthly': return 'vs last month';
    }
  };

  const renderWidget = (widgetId: string) => {
    const isCollapsed = preferences.collapsedWidgets.includes(widgetId);
    
    switch (widgetId) {
      case 'stats':
        return (
          <div key={widgetId} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border border-border shadow-sm rounded-xl hover:shadow-md transition-shadow bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.iconColor }}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">{getPeriodLabel()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case 'charts':
        return (
          <div key={widgetId} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableWidget
              id="chart-donut"
              title="Job Status Distribution"
              icon={<PieChart className="h-5 w-5 text-blue-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-donut')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-donut')}
            >
              <div className="h-[280px]">
                <DonutChart timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
            
            <DraggableWidget
              id="chart-bar"
              title="Robot Utilization"
              icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
              isCollapsed={preferences.collapsedWidgets.includes('chart-bar')}
              onToggleCollapse={() => toggleWidgetCollapse('chart-bar')}
            >
              <div className="h-[280px]">
                <BarChartComponent timeFilter={preferences.timeFilter} />
              </div>
            </DraggableWidget>
          </div>
        );
      
      case 'top-processes-queues':
        return (
          <div key={widgetId} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableWidget
              id="top-processes"
              title="Top Processes"
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
              title="Top Queues"
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
      
      case 'performance-trends':
        return (
          <DraggableWidget
            key={widgetId}
            id={widgetId}
            title="Job Performance Trends"
            icon={<LineChart className="h-5 w-5 text-blue-500" />}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => toggleWidgetCollapse(widgetId)}
          >
            <div className="h-[300px]">
              <TrendChart timeFilter={preferences.timeFilter} />
            </div>
          </DraggableWidget>
        );
      
      case 'ai-recommendations':
        return (
          <DraggableWidget
            key={widgetId}
            id={widgetId}
            title="AI-Powered Process Recommendations"
            icon={
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
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
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-card-foreground">{suggestion.process}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                            {suggestion.category}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            suggestion.impact === 'High' 
                              ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                          }`}>
                            {suggestion.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          suggestion.confidence >= 90 
                            ? 'text-emerald-600' 
                            : suggestion.confidence >= 70 
                            ? 'text-amber-600' 
                            : 'text-rose-600'
                        }`}>
                          {suggestion.confidence}% Confidence
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Save {suggestion.estimatedSaving}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {suggestion.suggestion}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUp className="h-3 w-3" />
                      <span className="text-xs font-medium">Potential improvement</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900">
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-card-foreground">Want more insights?</h4>
                    <p className="text-sm text-muted-foreground">Get personalized recommendations based on your data</p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generate More
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
