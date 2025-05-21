
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Robot A',
    utilization: 92,
  },
  {
    name: 'Robot B',
    utilization: 74,
  },
  {
    name: 'Robot C',
    utilization: 67,
  },
];

const RobotUtilization = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm h-[288px]">
      <h2 className="text-base font-normal text-[#171717]">Robot Kullanımı</h2>
      
      <div className="mt-4 h-[110px] bg-[#D4D4D4] rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Bar dataKey="utilization" fill="#404040" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="text-sm text-[#404040]">{item.name}</span>
            <span className="text-sm text-[#737373]">{item.utilization}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RobotUtilization;
