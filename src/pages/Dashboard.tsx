
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Server,
  BarChart3,
  Activity,
  Settings,
  Zap,
  Database,
  RefreshCcw
} from 'lucide-react';
import { DonutChart, TrendChart, BarChartComponent } from '../components/dashboard/Charts';
import ChartCard from '../components/dashboard/ChartCard';
import TimeFilter from '../components/dashboard/TimeFilter';
import DateSelector from '../components/dashboard/DateSelector';
import AISuggestion from '../components/dashboard/AISuggestion';

const Dashboard = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const stats = [
    {
      title: "Total Robots",
      value: "42",
      change: "+8%",
      isPositive: true,
      icon: Bot,
      iconColor: "#262626"
    },
    {
      title: "Active Jobs",
      value: "12",
      change: "+12%",
      isPositive: true,
      icon: Activity,
      iconColor: "#3B82F6"
    },
    {
      title: "Failed Jobs",
      value: "3",
      change: "+2%",
      isPositive: true,
      icon: AlertCircle,
      iconColor: "#EF4444"
    },
    {
      title: "Queue Items",
      value: "256",
      change: "-5%",
      isPositive: false,
      icon: Clock,
      iconColor: "#F59E0B"
    },
    {
      title: "FTE Saving",
      value: "120h",
      change: "+15%",
      isPositive: true,
      icon: TrendingUp,
      iconColor: "#10B981"
    },
    {
      title: "Transaction Count",
      value: "1,987",
      change: "+7%",
      isPositive: true,
      icon: Database,
      iconColor: "#8B5CF6"
    },
    {
      title: "Total Runtime",
      value: "320h",
      change: "+5%",
      isPositive: true,
      icon: Clock,
      iconColor: "#06B6D4"
    },
    {
      title: "Robot Utilization",
      value: "82%",
      change: "+3%",
      isPositive: true,
      icon: BarChart3,
      iconColor: "#6366F1"
    }
  ];

  const aiSuggestions = [
    {
      process: "Invoice Processing",
      suggestion: "Robot kapasitesi artırılarak işlem süresi %25 azaltılabilir",
      confidence: 95
    },
    {
      process: "Data Migration",
      suggestion: "Parallel processing ile throughput %40 artırılabilir",
      confidence: 87
    },
    {
      process: "Report Generation",
      suggestion: "Cache mekanizması ile response time %60 iyileştirilebilir",
      confidence: 78
    }
  ];

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your automation processes</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <DateSelector date="May 19, 2025" onRefresh={() => window.location.reload()} />
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-[#F5F5F5] shadow-sm rounded-xl">
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
                  <span className="text-xs text-gray-500">vs last month</span>
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

      {/* Job Performance Trends */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">Job Performance Trends</CardTitle>
            <TimeFilter activeFilter={activeTimeFilter} onChange={setActiveTimeFilter} />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <TrendChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            AI Destekli Süreç Önerileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <AISuggestion 
                key={index}
                process={suggestion.process}
                suggestion={suggestion.suggestion}
                confidence={suggestion.confidence}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
