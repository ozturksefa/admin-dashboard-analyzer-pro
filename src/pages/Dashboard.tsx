
import React, { useState } from 'react';
import { Robot, Briefcase, AlertTriangle, FileStack, Clock, ActivitySquare, BarChart3, Gauge } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import { DonutChart, BarChartComponent, TrendChart } from '../components/dashboard/Charts';
import DateSelector from '../components/dashboard/DateSelector';
import TimeFilter from '../components/dashboard/TimeFilter';
import AISuggestion from '../components/dashboard/AISuggestion';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const handleRefresh = () => {
    console.log('Refreshing dashboard data...');
    // Implement data refresh logic here
  };

  return (
    <div className="max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Welcome, Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your automation processes</p>
        </div>
        <DateSelector date="May 19, 2025" onRefresh={handleRefresh} />
      </div>
      
      {/* Summary Metrics - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Robots" 
          value="42" 
          change={8} 
          icon={<Robot size={20} />}
        />
        <StatCard 
          title="Active Jobs" 
          value="12" 
          change={12} 
          icon={<Briefcase size={20} />}
          iconBg="bg-blue-600"
        />
        <StatCard 
          title="Failed Jobs" 
          value="3" 
          change={2} 
          icon={<AlertTriangle size={20} />}
          iconBg="bg-red-600"
        />
        <StatCard 
          title="Queue Items" 
          value="256" 
          change={-5} 
          icon={<FileStack size={20} />}
          iconBg="bg-amber-600"
        />
      </div>
      
      {/* Extended Metrics - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="FTE Saving" 
          value="120h" 
          change={15} 
          icon={<Clock size={20} />}
          iconBg="bg-emerald-600"
        />
        <StatCard 
          title="Transaction Count" 
          value="1,987" 
          change={7} 
          icon={<ActivitySquare size={20} />}
          iconBg="bg-violet-600"
        />
        <StatCard 
          title="Total Runtime" 
          value="320h" 
          change={5} 
          icon={<BarChart3 size={20} />}
          iconBg="bg-cyan-600"
        />
        <StatCard 
          title="Robot Utilization" 
          value="82%" 
          change={3} 
          icon={<Gauge size={20} />}
          iconBg="bg-indigo-600"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Job Status Distribution">
          <DonutChart />
        </ChartCard>
        <ChartCard title="Robot Utilization">
          <BarChartComponent />
        </ChartCard>
      </div>
      
      {/* Trends Chart */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-medium text-[#171717]">Job Performance Trends</h2>
            <TimeFilter activeFilter={timeFilter} onChange={setTimeFilter} />
          </div>
          <div className="h-[350px]">
            <TrendChart />
          </div>
        </div>
      </div>
      
      {/* AI Suggestions */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm">
          <h2 className="text-base font-medium text-[#171717] mb-4">AI Destekli Süreç Önerileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AISuggestion 
              process="Fatura Onay" 
              suggestion="Süreç %87 başarıyla otomatize edilebilir."
              confidence={87}
            />
            <AISuggestion 
              process="Müşteri Kayıt" 
              suggestion="Doğrulama adımları otomatize edilerek işlem süresi %65 azaltılabilir."
              confidence={82}
            />
            <AISuggestion 
              process="Veri Doğrulama" 
              suggestion="Makine öğrenmesi modeli ile doğruluk oranı %92'ye çıkarılabilir."
              confidence={95}
            />
            <AISuggestion 
              process="Rapor Oluşturma" 
              suggestion="İşlem hacmi %40 artırılabilir ve manuel hatalar önlenebilir."
              confidence={78}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
