
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcessDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  process: any;
}

const ProcessDetailsModal = ({ isOpen, onClose, process }: ProcessDetailsModalProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Error': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Process Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Process Name</label>
                  <p className="text-sm text-gray-900 mt-1">{process.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusBadge(process.status)}>
                      {process.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Environment</label>
                  <p className="text-sm text-gray-900 mt-1">{process.environment}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-sm text-gray-900 mt-1">{process.createdAt}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900 mt-1">{process.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Execution Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Run</label>
                  <p className="text-sm text-gray-900 mt-1">{process.lastRun}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Executions</label>
                  <p className="text-sm text-gray-900 mt-1">156</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Success Rate</label>
                  <p className="text-sm text-gray-900 mt-1">94.2%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Average Runtime</label>
                  <p className="text-sm text-gray-900 mt-1">2.5 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Package</label>
                  <p className="text-sm text-gray-900 mt-1">InvoiceProcessor.nupkg</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <p className="text-sm text-gray-900 mt-1">1.2.3</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Input Arguments</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">folderPath</span>
                      <span className="text-sm text-gray-600">/data/invoices</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">outputFormat</span>
                      <span className="text-sm text-gray-600">JSON</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDetailsModal;
