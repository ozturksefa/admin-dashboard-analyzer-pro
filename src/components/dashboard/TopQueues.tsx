
import React from 'react';
import { Layers, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface TopQueuesProps {
  timeFilter: 'daily' | 'weekly' | 'monthly';
}

const TopQueues: React.FC<TopQueuesProps> = ({ timeFilter }) => {
  const queueData = {
    daily: [
      { name: 'Invoice Queue', total: 256, processed: 234, pending: 15, failed: 7, avgTime: '2.3s' },
      { name: 'Customer Requests', total: 189, processed: 178, pending: 8, failed: 3, avgTime: '1.8s' },
      { name: 'Data Validation', total: 145, processed: 140, pending: 3, failed: 2, avgTime: '0.9s' },
      { name: 'Report Queue', total: 98, processed: 95, pending: 2, failed: 1, avgTime: '4.2s' },
      { name: 'Email Processing', total: 67, processed: 65, pending: 1, failed: 1, avgTime: '1.1s' },
    ],
    weekly: [
      { name: 'Invoice Queue', total: 1567, processed: 1489, pending: 54, failed: 24, avgTime: '2.1s' },
      { name: 'Customer Requests', total: 1234, processed: 1198, pending: 28, failed: 8, avgTime: '1.9s' },
      { name: 'Data Validation', total: 987, processed: 965, pending: 15, failed: 7, avgTime: '0.8s' },
      { name: 'Report Queue', total: 654, processed: 638, pending: 12, failed: 4, avgTime: '4.5s' },
      { name: 'HR Requests', total: 432, processed: 421, pending: 8, failed: 3, avgTime: '2.3s' },
    ],
    monthly: [
      { name: 'Invoice Queue', total: 6234, processed: 5987, pending: 189, failed: 58, avgTime: '2.2s' },
      { name: 'Customer Requests', total: 4567, processed: 4423, pending: 102, failed: 42, avgTime: '1.7s' },
      { name: 'Data Validation', total: 3890, processed: 3812, pending: 56, failed: 22, avgTime: '0.9s' },
      { name: 'Report Queue', total: 2456, processed: 2398, pending: 43, failed: 15, avgTime: '4.1s' },
      { name: 'Email Processing', total: 1987, processed: 1945, pending: 32, failed: 10, avgTime: '1.2s' },
    ],
  };

  const data = queueData[timeFilter];

  const getSuccessRate = (processed: number, total: number) => {
    return ((processed / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-3">
      {data.map((queue, index) => (
        <div 
          key={index}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                <Layers className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{queue.name}</p>
                <p className="text-xs text-gray-500">{queue.total.toLocaleString()} items</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Avg: {queue.avgTime}</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${getSuccessRate(queue.processed, queue.total)}%` }}
            />
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>{queue.processed.toLocaleString()} processed</span>
            </div>
            <div className="flex items-center gap-1 text-amber-600">
              <Clock className="h-3 w-3" />
              <span>{queue.pending} pending</span>
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <AlertCircle className="h-3 w-3" />
              <span>{queue.failed} failed</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopQueues;
