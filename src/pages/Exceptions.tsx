
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  AlertTriangle, 
  Filter, 
  MoreVertical, 
  RefreshCw, 
  Search,
  Calendar,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  XCircle,
  Info
} from 'lucide-react';

interface Exception {
  id: string;
  message: string;
  type: 'Business' | 'System' | 'Application';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  process: string;
  robot: string;
  timestamp: string;
  status: 'New' | 'Acknowledged' | 'Resolved';
}

const exceptions: Exception[] = [
  {
    id: '1',
    message: 'Invalid invoice format detected in processing queue',
    type: 'Business',
    severity: 'High',
    process: 'InvoiceProcessing',
    robot: 'Robot01',
    timestamp: '2024-01-15 10:30:00',
    status: 'New'
  },
  {
    id: '2',
    message: 'Database connection timeout during data synchronization',
    type: 'System',
    severity: 'Critical',
    process: 'DataSynchronization',
    robot: 'Robot02',
    timestamp: '2024-01-15 09:15:00',
    status: 'Acknowledged'
  },
  {
    id: '3',
    message: 'UI element not found: Submit button in application form',
    type: 'Application',
    severity: 'Medium',
    process: 'FormSubmission',
    robot: 'Robot03',
    timestamp: '2024-01-15 08:45:00',
    status: 'Resolved'
  }
];

const Exceptions = () => {
  const [selectedExceptions, setSelectedExceptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedExceptions(exceptions.map(exception => exception.id));
    } else {
      setSelectedExceptions([]);
    }
  };

  const handleSelectException = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedExceptions([...selectedExceptions, id]);
    } else {
      setSelectedExceptions(selectedExceptions.filter(exceptionId => exceptionId !== id));
    }
  };

  const getSeverityIcon = (severity: Exception['severity']) => {
    switch (severity) {
      case 'Critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'High':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'Medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Low':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: Exception['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'High':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Low':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: Exception['status']) => {
    switch (status) {
      case 'New':
        return 'text-red-700 bg-red-50';
      case 'Acknowledged':
        return 'text-orange-700 bg-orange-50';
      case 'Resolved':
        return 'text-green-700 bg-green-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Exceptions</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage process exceptions</p>
        </div>
        
        <div className="flex gap-3">
          <Button size="sm" variant="outline" className="text-gray-600">
            <AlertTriangle className="mr-2 h-4 w-4" /> Acknowledge All
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exceptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-[250px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
            <Button variant="outline" size="sm" className="text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              <Filter className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 px-3">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      {isMobile && (
        <div className="space-y-4">
          {exceptions.map((exception) => (
            <Card key={exception.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getSeverityIcon(exception.severity)}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{exception.message}</h3>
                    <div className="flex items-center mt-2 gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs border ${getSeverityColor(exception.severity)}`}>
                        {exception.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(exception.status)}`}>
                        {exception.status}
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Process</p>
                  <p>{exception.process}</p>
                </div>
                <div>
                  <p className="font-semibold">Robot</p>
                  <p>{exception.robot}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View details
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div className="bg-white rounded-xl border border-[#F5F5F5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-gray-50/50 border-b border-gray-200">
                  <TableHead className="w-12 py-3">
                    <Checkbox 
                      checked={selectedExceptions.length === exceptions.length && exceptions.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Message</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Type</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Severity</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Process</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Robot</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Timestamp</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Status</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.map((exception) => (
                  <TableRow 
                    key={exception.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedExceptions.includes(exception.id)}
                        onCheckedChange={(checked) => handleSelectException(exception.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="py-4 max-w-[300px]">
                      <span className="line-clamp-2 text-gray-900" title={exception.message}>
                        {exception.message}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">{exception.type}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        {getSeverityIcon(exception.severity)}
                        <span className={`px-2 py-1 rounded-md text-xs border ${getSeverityColor(exception.severity)}`}>
                          {exception.severity}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{exception.process}</TableCell>
                    <TableCell className="py-4">{exception.robot}</TableCell>
                    <TableCell className="py-4">{exception.timestamp}</TableCell>
                    <TableCell className="py-4">
                      <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(exception.status)}`}>
                        {exception.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>1 - 3 / 3</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4" />
                <span className="mx-2">Page 1 / 1</span>
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exceptions;
