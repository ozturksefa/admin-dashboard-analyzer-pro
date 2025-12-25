
import React from 'react';
import { Server, Wifi, Database, Cpu, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SystemHealthProps {
  refreshKey?: number;
}

const SystemHealth: React.FC<SystemHealthProps> = ({ refreshKey }) => {
  const systems = [
    { name: 'Orchestrator Server', status: 'healthy', uptime: '99.9%', icon: Server },
    { name: 'Robot Network', status: 'healthy', uptime: '99.7%', icon: Wifi },
    { name: 'Database', status: 'warning', uptime: '98.5%', icon: Database },
    { name: 'Processing Engine', status: 'healthy', uptime: '99.8%', icon: Cpu },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {systems.map((system, index) => (
        <div 
          key={index}
          className={`p-3 rounded-lg border ${getStatusBg(system.status)} transition-all`}
        >
          <div className="flex items-center justify-between mb-2">
            <system.icon className="h-5 w-5 text-gray-600" />
            {getStatusIcon(system.status)}
          </div>
          <p className="text-sm font-medium text-gray-900">{system.name}</p>
          <p className="text-xs text-gray-500">Uptime: {system.uptime}</p>
        </div>
      ))}
    </div>
  );
};

export default SystemHealth;
