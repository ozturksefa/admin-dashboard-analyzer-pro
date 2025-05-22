
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

export const DonutChart = () => {
  const data = [
    { name: 'Success', value: 65, color: '#10B981' },
    { name: 'Failed', value: 10, color: '#EF4444' },
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Running', value: 10, color: '#3B82F6' },
  ];
  
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

export const TrendChart = () => {
  const data = [
    { name: 'Jan', completed: 400, failed: 30 },
    { name: 'Feb', completed: 300, failed: 20 },
    { name: 'Mar', completed: 500, failed: 45 },
    { name: 'Apr', completed: 200, failed: 15 },
    { name: 'May', completed: 600, failed: 40 },
    { name: 'Jun', completed: 400, failed: 25 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} name="Completed" />
        <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} name="Failed" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const BarChartComponent = () => {
  const data = [
    { name: 'Robot A', utilization: 92 },
    { name: 'Robot B', utilization: 74 },
    { name: 'Robot C', utilization: 67 },
    { name: 'Robot D', utilization: 88 },
    { name: 'Robot E', utilization: 53 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 100]} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
        <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
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

