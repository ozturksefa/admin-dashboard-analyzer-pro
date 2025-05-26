
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const dailyData = [
  { name: '1', jobs: 45 }, { name: '2', jobs: 52 }, { name: '3', jobs: 48 },
  { name: '4', jobs: 61 }, { name: '5', jobs: 55 }, { name: '6', jobs: 67 },
  { name: '7', jobs: 69 }
];

const weeklyData = [
  { name: 'Week 1', jobs: 320 }, { name: 'Week 2', jobs: 280 }, 
  { name: 'Week 3', jobs: 400 }, { name: 'Week 4', jobs: 350 }
];

const hourlyData = [
  { name: '9AM', jobs: 12 }, { name: '10AM', jobs: 19 }, { name: '11AM', jobs: 15 },
  { name: '12PM', jobs: 25 }, { name: '1PM', jobs: 22 }, { name: '2PM', jobs: 30 },
  { name: '3PM', jobs: 28 }, { name: '4PM', jobs: 20 }
];

const PerformanceTrends = () => {
  const [activeFilter, setActiveFilter] = useState<'daily' | 'weekly' | 'hourly'>('daily');

  const getChartData = () => {
    switch (activeFilter) {
      case 'weekly': return weeklyData;
      case 'hourly': return hourlyData;
      default: return dailyData;
    }
  };

  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">Job Performance Trends</CardTitle>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {['daily', 'weekly', 'hourly'].map((filter) => (
            <button
              key={filter}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                activeFilter === filter
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
              onClick={() => setActiveFilter(filter as 'daily' | 'weekly' | 'hourly')}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="jobs" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 6 }}
                activeDot={{ r: 8, fill: '#1D4ED8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrends;
