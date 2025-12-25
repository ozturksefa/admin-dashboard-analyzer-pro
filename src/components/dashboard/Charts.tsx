
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell,
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface ChartProps {
  timeFilter?: 'daily' | 'weekly' | 'monthly';
}

export const DonutChart: React.FC<ChartProps> = ({ timeFilter = 'daily' }) => {
  const chartData = {
    daily: [
      { name: 'Success', value: 65, color: '#10B981' },
      { name: 'Failed', value: 10, color: '#EF4444' },
      { name: 'Pending', value: 15, color: '#F59E0B' },
      { name: 'Running', value: 10, color: '#3B82F6' },
    ],
    weekly: [
      { name: 'Success', value: 72, color: '#10B981' },
      { name: 'Failed', value: 8, color: '#EF4444' },
      { name: 'Pending', value: 12, color: '#F59E0B' },
      { name: 'Running', value: 8, color: '#3B82F6' },
    ],
    monthly: [
      { name: 'Success', value: 78, color: '#10B981' },
      { name: 'Failed', value: 6, color: '#EF4444' },
      { name: 'Pending', value: 10, color: '#F59E0B' },
      { name: 'Running', value: 6, color: '#3B82F6' },
    ],
  };

  const data = chartData[timeFilter];
  const COLORS = data.map(item => item.color);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const TrendChart: React.FC<ChartProps> = ({ timeFilter = 'daily' }) => {
  const chartData = {
    daily: [
      { name: '00:00', completed: 45, failed: 3 },
      { name: '04:00', completed: 28, failed: 2 },
      { name: '08:00', completed: 78, failed: 5 },
      { name: '12:00', completed: 95, failed: 8 },
      { name: '16:00', completed: 112, failed: 6 },
      { name: '20:00', completed: 67, failed: 4 },
    ],
    weekly: [
      { name: 'Mon', completed: 320, failed: 25 },
      { name: 'Tue', completed: 450, failed: 32 },
      { name: 'Wed', completed: 520, failed: 28 },
      { name: 'Thu', completed: 480, failed: 35 },
      { name: 'Fri', completed: 560, failed: 42 },
      { name: 'Sat', completed: 280, failed: 15 },
      { name: 'Sun', completed: 180, failed: 10 },
    ],
    monthly: [
      { name: 'Week 1', completed: 2400, failed: 180 },
      { name: 'Week 2', completed: 2800, failed: 150 },
      { name: 'Week 3', completed: 3200, failed: 220 },
      { name: 'Week 4', completed: 2900, failed: 170 },
    ],
  };

  const data = chartData[timeFilter];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} name="Completed" />
        <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} name="Failed" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const BarChartComponent: React.FC<ChartProps> = ({ timeFilter = 'daily' }) => {
  const chartData = {
    daily: [
      { name: 'Robot A', utilization: 92 },
      { name: 'Robot B', utilization: 74 },
      { name: 'Robot C', utilization: 67 },
      { name: 'Robot D', utilization: 88 },
      { name: 'Robot E', utilization: 53 },
    ],
    weekly: [
      { name: 'Robot A', utilization: 85 },
      { name: 'Robot B', utilization: 78 },
      { name: 'Robot C', utilization: 72 },
      { name: 'Robot D', utilization: 91 },
      { name: 'Robot E', utilization: 65 },
    ],
    monthly: [
      { name: 'Robot A', utilization: 88 },
      { name: 'Robot B', utilization: 82 },
      { name: 'Robot C', utilization: 75 },
      { name: 'Robot D', utilization: 94 },
      { name: 'Robot E', utilization: 71 },
    ],
  };

  const data = chartData[timeFilter];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 100]} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} width={60} />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'Utilization']}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
        />
        <Bar dataKey="utilization" fill="#3B82F6" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.utilization > 85 ? '#10B981' : entry.utilization > 70 ? '#3B82F6' : '#F59E0B'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};


