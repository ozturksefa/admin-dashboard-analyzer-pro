
import React from 'react';
import { AlertTriangle, Info, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface RecentAlertsProps {
  refreshKey?: number;
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ refreshKey }) => {
  const alerts = [
    { 
      id: 1, 
      type: 'error', 
      message: 'Robot-05 connection lost', 
      time: '2 min ago',
      process: 'Invoice Processing'
    },
    { 
      id: 2, 
      type: 'warning', 
      message: 'Queue items exceeding threshold', 
      time: '15 min ago',
      process: 'Data Validation'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'Scheduled maintenance in 2 hours', 
      time: '30 min ago',
      process: 'System'
    },
    { 
      id: 4, 
      type: 'success', 
      message: 'Robot-03 recovered successfully', 
      time: '1 hour ago',
      process: 'Report Generation'
    },
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'error':
        return { 
          bg: 'bg-red-50 border-red-200', 
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          dot: 'bg-red-500'
        };
      case 'warning':
        return { 
          bg: 'bg-amber-50 border-amber-200', 
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
          dot: 'bg-amber-500'
        };
      case 'info':
        return { 
          bg: 'bg-blue-50 border-blue-200', 
          icon: <Info className="h-4 w-4 text-blue-500" />,
          dot: 'bg-blue-500'
        };
      case 'success':
        return { 
          bg: 'bg-green-50 border-green-200', 
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          dot: 'bg-green-500'
        };
      default:
        return { 
          bg: 'bg-gray-50 border-gray-200', 
          icon: <Info className="h-4 w-4 text-gray-500" />,
          dot: 'bg-gray-500'
        };
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const style = getAlertStyle(alert.type);
        return (
          <div 
            key={alert.id}
            className={`p-3 rounded-lg border ${style.bg} flex items-start gap-3`}
          >
            <div className="mt-0.5">{style.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{alert.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{alert.process}</span>
                <span className="text-xs text-gray-400">•</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
          </div>
        );
      })}
    </div>
  );
};

export default RecentAlerts;
