
import React, { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: ReactNode;
  iconBg?: string;
}

const StatCard = ({ title, value, change, icon, iconBg = "bg-[#171717]" }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        <span className="text-sm text-[#A3A3A3]">{title}</span>
      </div>
      
      <div className="mt-4">
        <h3 className="text-3xl font-medium text-[#171717]">{value}</h3>
      </div>
      
      <div className="mt-3 flex items-center">
        <div className={`flex items-center ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? (
            <ArrowUp size={14} />
          ) : (
            <ArrowDown size={14} />
          )}
          <span className="text-sm font-medium ml-1">{Math.abs(change)}%</span>
        </div>
        <span className="text-sm text-[#737373] ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
