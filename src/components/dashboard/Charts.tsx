
import React from 'react';
import { 
  PieChart, 
  Pie, 
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
    { name: 'Completed', value: 400 },
    { name: 'In Progress', value: 300 },
    { name: 'Failed', value: 100 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const TrendChart = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 400 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#171717" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const GaugeChart = () => {
  // This is a simplified gauge chart using a pie chart
  const data = [
    { name: 'Utilized', value: 75 },
    { name: 'Available', value: 25 },
  ];
  
  return (
    <div className="relative">
      <ResponsiveContainer width={180} height={120}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={30}
            outerRadius={60}
            fill="#A3A3A3"
            paddingAngle={0}
            dataKey="value"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-white">
        75%
      </div>
    </div>
  );
};
