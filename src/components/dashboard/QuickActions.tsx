
import React from 'react';
import { Play, Pause, Plus, Settings, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Start Job', icon: Play, color: 'bg-green-600 hover:bg-green-700' },
    { label: 'Stop All', icon: Pause, color: 'bg-red-600 hover:bg-red-700' },
    { label: 'New Process', icon: Plus, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Schedule', icon: Calendar, color: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'Export Report', icon: Download, color: 'bg-amber-600 hover:bg-amber-700' },
    { label: 'Settings', icon: Settings, color: 'bg-gray-600 hover:bg-gray-700' },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`h-auto py-4 flex flex-col items-center gap-2 ${action.color} text-white`}
        >
          <action.icon className="h-5 w-5" />
          <span className="text-xs font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
