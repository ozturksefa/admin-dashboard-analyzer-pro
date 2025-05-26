
import React from 'react';
import { Briefcase } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  date: string;
}

const activities: Activity[] = [
  { id: '#134', name: 'Job #134', date: '10 May 2025' },
  { id: '#133', name: 'Job #133', date: '8 May 2025' },
  { id: '#132', name: 'Job #132', date: '6 May 2025' },
];

const RecentActivities = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#F5F5F5] shadow-sm h-[288px]">
      <h2 className="text-base font-normal text-[#171717]">Son İşlemler</h2>
      
      <div className="mt-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className={`flex items-center justify-between py-3.5 ${
              index !== activities.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#A3A3A3] rounded-full flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="ml-3 text-sm text-[#171717]">{activity.name}</span>
            </div>
            <span className="text-xs text-[#737373]">{activity.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
