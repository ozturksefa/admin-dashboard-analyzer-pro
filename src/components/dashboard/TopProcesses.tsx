
import React from 'react';
import { Workflow, TrendingUp, TrendingDown } from 'lucide-react';

interface TopProcessesProps {
  timeFilter: 'daily' | 'weekly' | 'monthly';
}

const TopProcesses: React.FC<TopProcessesProps> = ({ timeFilter }) => {
  const processData = {
    daily: [
      { name: 'Invoice Processing', runs: 145, success: 98, change: 12 },
      { name: 'Data Migration', runs: 89, success: 95, change: 8 },
      { name: 'Report Generation', runs: 67, success: 92, change: -3 },
      { name: 'Email Automation', runs: 54, success: 99, change: 15 },
      { name: 'File Transfer', runs: 43, success: 88, change: -5 },
    ],
    weekly: [
      { name: 'Invoice Processing', runs: 892, success: 97, change: 10 },
      { name: 'Data Migration', runs: 534, success: 94, change: 5 },
      { name: 'Report Generation', runs: 421, success: 91, change: -2 },
      { name: 'Email Automation', runs: 312, success: 98, change: 18 },
      { name: 'Customer Onboarding', runs: 267, success: 96, change: 7 },
    ],
    monthly: [
      { name: 'Invoice Processing', runs: 3567, success: 96, change: 8 },
      { name: 'Data Migration', runs: 2134, success: 93, change: 3 },
      { name: 'Report Generation', runs: 1890, success: 90, change: -1 },
      { name: 'Email Automation', runs: 1456, success: 97, change: 12 },
      { name: 'HR Onboarding', runs: 1123, success: 95, change: 6 },
    ],
  };

  const data = processData[timeFilter];

  return (
    <div className="space-y-3">
      {data.map((process, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <Workflow className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{process.name}</p>
              <p className="text-xs text-gray-500">{process.runs.toLocaleString()} runs</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{process.success}%</p>
              <p className="text-xs text-gray-500">Success Rate</p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              process.change >= 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {process.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {process.change >= 0 ? '+' : ''}{process.change}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProcesses;
