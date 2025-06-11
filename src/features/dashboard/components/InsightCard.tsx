
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  iconColor: string;
}

const InsightCard = ({ title, value, change, isPositive, icon: Icon, iconColor }: InsightCardProps) => {
  return (
    <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: iconColor }}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
