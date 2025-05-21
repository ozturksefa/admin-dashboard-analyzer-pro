
import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: ReactNode;
}

const StatCard = ({ title, value, label, icon }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm">
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full bg-[#171717] flex items-center justify-center text-white">
          {icon}
        </div>
        <span className="text-xs text-[#A3A3A3] ml-auto">{title}</span>
      </div>
      
      <div className="mt-3">
        <h3 className="text-2xl font-normal text-[#171717]">{value}</h3>
      </div>
      
      <div className="mt-3">
        <p className="text-xs text-[#737373]">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
