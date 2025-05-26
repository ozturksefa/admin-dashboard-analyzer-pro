
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  onClick?: () => void;
}

const SummaryCard = ({ title, value, icon: Icon, iconColor, onClick }: SummaryCardProps) => {
  return (
    <div 
      className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-200 ${
        onClick ? 'hover:shadow-md cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconColor }}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
