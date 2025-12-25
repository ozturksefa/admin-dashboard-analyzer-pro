
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
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
  Zap,
  Shield,
  Bell,
  ExternalLink
} from 'lucide-react';
import { DonutChart, TrendChart, BarChartComponent } from '../components/dashboard/Charts';
import ChartCard from '../components/dashboard/ChartCard';
import TimeFilter from '../components/dashboard/TimeFilter';
import DateSelector from '../components/dashboard/DateSelector';
import TopProcesses from '../components/dashboard/TopProcesses';
import TopQueues from '../components/dashboard/TopQueues';
import AutoRefreshControl from '../components/dashboard/AutoRefreshControl';
import SystemHealth from '../components/dashboard/SystemHealth';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import QuickActions from '../components/dashboard/QuickActions';
import { useAutoRefresh } from '../hooks/useAutoRefresh';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTimeFilter, setActiveTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const { isEnabled, toggle, refresh, lastRefresh, countdown } = useAutoRefresh({ interval: 30 });
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    refresh();
    setRefreshKey(prev => prev + 1);
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

  const stats = statsData[activeTimeFilter];

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
    switch (activeTimeFilter) {
      case 'daily': return 'vs yesterday';
      case 'weekly': return 'vs last week';
      case 'monthly': return 'vs last month';
    }
  };

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your automation processes</p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <TimeFilter activeFilter={activeTimeFilter} onChange={setActiveTimeFilter} />
          <AutoRefreshControl 
            isEnabled={isEnabled}
            countdown={countdown}
            lastRefresh={lastRefresh}
            onToggle={toggle}
            onRefresh={handleRefresh}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SystemHealth refreshKey={refreshKey} />
        </CardContent>
      </Card>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-[#F5F5F5] shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.iconColor }}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.isPositive ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">{getPeriodLabel()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Job Status Distribution">
          <DonutChart />
        </ChartCard>
        
        <ChartCard title="Robot Utilization">
          <BarChartComponent />
        </ChartCard>
      </div>

      {/* Top Processes & Top Queues Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">Top Processes</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1 text-blue-600 hover:text-blue-700"
              onClick={() => navigate('/processes')}
            >
              View All
              <ExternalLink className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <TopProcesses timeFilter={activeTimeFilter} />
          </CardContent>
        </Card>
        
        <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">Top Queues</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1 text-blue-600 hover:text-blue-700"
              onClick={() => navigate('/queues')}
            >
              View All
              <ExternalLink className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <TopQueues timeFilter={activeTimeFilter} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-500" />
            Recent Alerts
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 text-blue-600 hover:text-blue-700"
            onClick={() => navigate('/exceptions')}
          >
            View All
            <ExternalLink className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <RecentAlerts refreshKey={refreshKey} />
        </CardContent>
      </Card>

      {/* Job Performance Trends */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">Job Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <TrendChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Process Recommendations */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium text-gray-900">
                  AI-Powered Process Recommendations
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Smart insights to optimize your automation workflows
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {aiSuggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                className="group p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{suggestion.process}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {suggestion.category}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          suggestion.impact === 'High' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
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
                      <div className="text-xs text-gray-500">
                        Save {suggestion.estimatedSaving}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {suggestion.suggestion}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUp className="h-3 w-3" />
                    <span className="text-xs font-medium">Potential improvement</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Want more insights?</h4>
                  <p className="text-sm text-gray-600">Get personalized recommendations based on your data</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Generate More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
