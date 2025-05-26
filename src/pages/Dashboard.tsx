
import React, { useState, useEffect } from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import ChartsSection from '../components/dashboard/ChartsSection';
import PerformanceTrends from '../components/dashboard/PerformanceTrends';
import AISuggestions from '../components/dashboard/AISuggestions';

const Dashboard = () => {
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

  return (
    <div className="max-w-full space-y-6">
      {/* Summary Cards Row */}
      <SummaryCards dashboardData={dashboardData} />

      {/* Charts Row */}
      <ChartsSection />

      {/* Performance Trends Row */}
      <PerformanceTrends />

      {/* AI Suggestions Row */}
      <AISuggestions />
    </div>
  );
};

export default Dashboard;
