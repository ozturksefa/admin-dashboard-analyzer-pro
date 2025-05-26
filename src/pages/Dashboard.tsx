
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Bot, 
  Calendar, 
  Users,
} from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import { DonutChart, TrendChart, BarChartComponent } from '../components/dashboard/Charts';
import ChartCard from '../components/dashboard/ChartCard';
import PerformanceTrends from '../components/dashboard/PerformanceTrends';
import AISuggestions from '../components/dashboard/AISuggestions';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    jobsCompleted: 234,
    activeRobots: 8,
    upcomingSchedules: 15,
    registeredUsers: 23
  });

  // Listen for refresh events
  useEffect(() => {
    const handleRefresh = () => {
      console.log('Refreshing dashboard data...');
      // Simulate API call to refresh data
      fetchDashboardData();
    };

    const handleDateRangeChange = (event: CustomEvent) => {
      console.log('Date range changed:', event.detail);
      // Simulate API call with new date range
      fetchDashboardData(event.detail);
    };

    window.addEventListener('dashboard-refresh', handleRefresh);
    window.addEventListener('date-range-change', handleDateRangeChange as EventListener);

    return () => {
      window.removeEventListener('dashboard-refresh', handleRefresh);
      window.removeEventListener('date-range-change', handleDateRangeChange as EventListener);
    };
  }, []);

  const fetchDashboardData = (dateRange?: { from: Date; to: Date }) => {
    // Simulate API call
    console.log('Fetching dashboard data for range:', dateRange);
    // In real implementation, this would be an actual API call
    setDashboardData({
      jobsCompleted: Math.floor(Math.random() * 300) + 200,
      activeRobots: Math.floor(Math.random() * 5) + 6,
      upcomingSchedules: Math.floor(Math.random() * 10) + 10,
      registeredUsers: Math.floor(Math.random() * 15) + 20
    });
  };

  const summaryCards = [
    {
      title: "Jobs Completed",
      value: dashboardData.jobsCompleted,
      icon: CheckCircle,
      iconColor: "#10B981",
      onClick: () => navigate('/jobs')
    },
    {
      title: "Active Robots",
      value: dashboardData.activeRobots,
      icon: Bot,
      iconColor: "#3B82F6",
      onClick: () => navigate('/robots')
    },
    {
      title: "Upcoming Schedules",
      value: dashboardData.upcomingSchedules,
      icon: Calendar,
      iconColor: "#F59E0B",
      onClick: () => navigate('/schedules')
    },
    {
      title: "Registered Users",
      value: dashboardData.registeredUsers,
      icon: Users,
      iconColor: "#8B5CF6",
      onClick: () => navigate('/users')
    }
  ];

  return (
    <div className="max-w-full space-y-6">
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <SummaryCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconColor={card.iconColor}
            onClick={card.onClick}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Robot Utilization">
          <BarChartComponent />
        </ChartCard>
        
        <ChartCard title="Job Status Distribution">
          <DonutChart />
        </ChartCard>
      </div>

      {/* Performance Trends Row */}
      <PerformanceTrends />

      {/* AI Suggestions Row */}
      <AISuggestions />
    </div>
  );
};

export default Dashboard;
