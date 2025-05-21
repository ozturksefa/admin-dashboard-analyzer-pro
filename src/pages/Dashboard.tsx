
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentActivities from '../components/dashboard/RecentActivities';
import RobotUtilization from '../components/dashboard/RobotUtilization';
import { DonutChart, GaugeChart, TrendChart } from '../components/dashboard/Charts';
import { Briefcase, Users, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-normal text-[#171717]">Dashboard</h1>
        <button className="flex items-center px-4 py-2 text-sm bg-white border border-[#E5E5E5] rounded shadow-sm">
          <CalendarIcon size={14} className="mr-2 text-[#404040]" />
          <span className="text-[#404040]">1–31 May 2025</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Jobs" 
          value="234" 
          label="Completed this month" 
          icon={<Briefcase size={16} className="text-white" />}
        />
        <StatCard 
          title="Robots" 
          value="8" 
          label="Active today" 
          icon={<Users size={16} className="text-white" />}
        />
        <StatCard 
          title="Schedules" 
          value="15" 
          label="Upcoming" 
          icon={<Calendar size={16} className="text-white" />}
        />
        <StatCard 
          title="Users" 
          value="23" 
          label="Registered" 
          icon={<Users size={16} className="text-white" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard title="Job Durum Dağılımı">
          <DonutChart />
        </ChartCard>
        <ChartCard title="Robot Kullanım Oranları">
          <GaugeChart />
        </ChartCard>
      </div>
      
      <div className="mb-10">
        <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm h-[330px]">
          <div className="flex items-center">
            <CalendarIcon size={16} className="text-[#404040]" />
            <h2 className="text-base font-normal text-[#171717] ml-2">Trendler</h2>
          </div>
          <div className="mt-4 h-[240px] bg-[#E5E5E5] rounded-lg flex items-center justify-center">
            <TrendChart />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <RecentActivities />
        <RobotUtilization />
      </div>
      
      {/* AI Recommendations Section */}
      <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm mb-4">
        <h2 className="text-base font-normal text-[#171717] mb-4">AI Önerileri</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">Process Name: Invoice Processing</h3>
              <span className="text-green-600">Confidence: 92%</span>
            </div>
            <p className="mt-2 text-gray-600">
              Implement OCR to extract data from invoices automatically. This could save approximately 120 hours monthly.
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">Process Name: Customer Onboarding</h3>
              <span className="text-green-600">Confidence: 87%</span>
            </div>
            <p className="mt-2 text-gray-600">
              Automating verification steps could reduce processing time by 65% and improve accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
