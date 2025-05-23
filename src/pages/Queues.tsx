
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Inbox, 
  Filter, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Search,
  Calendar,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

interface QueueItem {
  id: string;
  name: string;
  status: 'New' | 'InProgress' | 'Successful' | 'Failed';
  priority: 'High' | 'Medium' | 'Low';
  reference: string;
  creationTime: string;
  dueDate: string;
  retryCount: number;
}

const queueItems: QueueItem[] = [
  {
    id: '1',
    name: 'Invoice Processing Queue',
    status: 'New',
    priority: 'High',
    reference: 'INV-2024-001',
    creationTime: '2024-01-15 10:30:00',
    dueDate: '2024-01-15 18:00:00',
    retryCount: 0
  },
  {
    id: '2',
    name: 'Data Entry Queue',
    status: 'InProgress',
    priority: 'Medium',
    reference: 'DATA-2024-002',
    creationTime: '2024-01-15 09:15:00',
    dueDate: '2024-01-16 12:00:00',
    retryCount: 1
  },
  {
    id: '3',
    name: 'Report Generation Queue',
    status: 'Successful',
    priority: 'Low',
    reference: 'RPT-2024-003',
    creationTime: '2024-01-15 08:00:00',
    dueDate: '2024-01-15 17:00:00',
    retryCount: 0
  }
];

const Queues = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
      setSelectedItems(queueItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const getStatusIcon = (status: QueueItem['status']) => {
    switch (status) {
      case 'New':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'InProgress':
        return <Loader className="h-4 w-4 text-orange-500 animate-spin" />;
      case 'Successful':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: QueueItem['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-orange-600 bg-orange-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Queues</h1>
          <p className="text-sm text-gray-500 mt-1">Manage queue items and workflow</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Queue Item
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search queue items..."
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
          {queueItems.map((item) => (
            <Card key={item.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Inbox className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
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
                    <DropdownMenuItem>Process Item</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Reference</p>
                  <p>{item.reference}</p>
                </div>
                <div>
                  <p className="font-semibold">Priority</p>
                  <span className={`px-2 py-1 rounded-md text-xs ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
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
                      checked={selectedItems.length === queueItems.length && queueItems.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Name</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Status</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Priority</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Reference</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Creation Time</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Due Date</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Retry Count</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queueItems.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium py-4">{item.name}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(item.status)}
                        <span>{item.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`px-2 py-1 rounded-md text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">{item.reference}</TableCell>
                    <TableCell className="py-4">{item.creationTime}</TableCell>
                    <TableCell className="py-4">{item.dueDate}</TableCell>
                    <TableCell className="py-4">{item.retryCount}</TableCell>
                    <TableCell className="text-right py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Process Item</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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

export default Queues;
