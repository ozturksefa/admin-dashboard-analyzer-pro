
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Package, Settings, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Process {
  id: string;
  name: string;
  environment: string;
  status: 'Active' | 'Inactive' | 'Draft';
  createdAt: string;
  lastRun: string;
  description: string;
  owner: string;
  package: string;
}

interface ProcessDetailsModalProps {
  process: Process;
  onClose: () => void;
}

const ProcessDetailsModal: React.FC<ProcessDetailsModalProps> = ({ process, onClose }) => {
  const getStatusBadge = (status: Process['status']) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-gray-100 text-gray-800',
      Draft: 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{process.name}</h3>
          {getStatusBadge(process.status)}
        </div>
        <p className="text-gray-600">{process.description}</p>
      </div>

      {/* Process Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Environment</p>
              <p className="text-sm text-gray-600">{process.environment}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Package</p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Package className="h-4 w-4" />
                {process.package}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Created At</p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(process.createdAt), 'MMM dd, yyyy at HH:mm')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Last Run</p>
              <p className="text-sm text-gray-600">{process.lastRun}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Owner Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Owner Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{process.owner}</p>
        </CardContent>
      </Card>

      {/* Recent Executions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Recent Executions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">Execution #1234</p>
                <p className="text-xs text-gray-500">Jan 25, 2024 at 14:30</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">Execution #1233</p>
                <p className="text-xs text-gray-500">Jan 25, 2024 at 10:15</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Execution #1232</p>
                <p className="text-xs text-gray-500">Jan 24, 2024 at 16:45</p>
              </div>
              <Badge className="bg-red-100 text-red-800">Failed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t">
        <Button className="flex-1">Run Process</Button>
        <Button variant="outline" className="flex-1">Schedule</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default ProcessDetailsModal;
