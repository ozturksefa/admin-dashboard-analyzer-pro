
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
  RefreshCcw,
  Lightbulb,
  ChevronRight,
  ArrowUp
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
