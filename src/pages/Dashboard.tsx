
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Bot, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  Server,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Running Jobs",
      value: "12",
      change: "+2 from yesterday",
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Active Robots",
      value: "8",
      change: "2 idle",
      icon: Bot,
      color: "text-green-600"
    },
    {
      title: "Successful Jobs",
      value: "156",
      change: "+12% from last week",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Failed Jobs",
      value: "3",
      change: "-50% from last week",
      icon: AlertCircle,
      color: "text-red-600"
    }
  ];

  const recentJobs = [
    {
      id: "1",
      name: "Invoice Processing",
      status: "Successful",
      robot: "Robot01",
      startTime: "2024-01-15 10:30:00",
      duration: "2m 15s"
    },
    {
      id: "2",
      name: "Data Migration",
      status: "Running",
      robot: "Robot02",
      startTime: "2024-01-15 10:45:00",
      duration: "1m 30s"
    },
    {
      id: "3",
      name: "Report Generation",
      status: "Failed",
      robot: "Robot03",
      startTime: "2024-01-15 09:15:00",
      duration: "0m 45s"
    }
  ];

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your automation environment</p>
        </div>
        
        <div className="flex gap-3">
          <Button size="sm" variant="outline" className="text-gray-600">
            <Calendar className="mr-2 h-4 w-4" /> Last 7 days
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <BarChart3 className="mr-2 h-4 w-4" /> View Reports
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-[#F5F5F5] shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        job.status === 'Successful' ? 'bg-green-500' :
                        job.status === 'Running' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{job.name}</p>
                        <p className="text-xs text-gray-500">Robot: {job.robot}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{job.startTime}</p>
                      <p className="text-xs text-gray-500">{job.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Bot className="mr-2 h-4 w-4" />
                Start New Job
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Robots
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Server className="mr-2 h-4 w-4" />
                View Processes
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Health */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-900">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <p className="text-sm text-gray-500">System Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3s</div>
              <p className="text-sm text-gray-500">Avg Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <p className="text-sm text-gray-500">Jobs Completed Today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
