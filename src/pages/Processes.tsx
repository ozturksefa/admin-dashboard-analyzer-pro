
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  FileText, 
  Filter, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Check, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Calendar as CalendarIcon,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import ProcessForm from '@/components/processes/ProcessForm';
import ProcessDetailsModal from '@/components/processes/ProcessDetailsModal';

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

const processes: Process[] = [
  {
    id: '1',
    name: 'Invoice Processing Automation',
    environment: 'Production',
    status: 'Active',
    createdAt: '2024-01-15',
    lastRun: '2024-01-25 14:30',
    description: 'Automated invoice processing with OCR and validation',
    owner: 'John Smith',
    package: 'InvoiceBot v2.1'
  },
  {
    id: '2',
    name: 'Customer Onboarding',
    environment: 'Staging',
    status: 'Active',
    createdAt: '2024-01-20',
    lastRun: '2024-01-25 10:15',
    description: 'New customer registration and verification process',
    owner: 'Sarah Johnson',
    package: 'OnboardBot v1.5'
  },
  {
    id: '3',
    name: 'Report Generation',
    environment: 'Production',
    status: 'Inactive',
    createdAt: '2024-01-10',
    lastRun: '2024-01-24 09:00',
    description: 'Weekly sales reports automation',
    owner: 'Mike Davis',
    package: 'ReportBot v3.0'
  }
];

const Processes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [environmentFilter, setEnvironmentFilter] = useState('All');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRefresh = () => {
    console.log('Refreshing processes data...');
    // TODO: Fetch data from backend
  };

  const handleViewDetails = (process: Process) => {
    setSelectedProcess(process);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (process: Process) => {
    setSelectedProcess(process);
    setIsEditModalOpen(true);
  };

  const handleDelete = (processId: string) => {
    if (confirm('Are you sure you want to delete this process?')) {
      console.log('Deleting process:', processId);
      // TODO: Delete from backend
    }
  };

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
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Processes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your automation processes</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Process
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Process</DialogTitle>
            </DialogHeader>
            <ProcessForm onClose={() => setIsAddModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search processes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-gray-600">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {statusFilter}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>Inactive</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Environment Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-gray-600">
                    Environment: {environmentFilter}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem onClick={() => setEnvironmentFilter('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEnvironmentFilter('Production')}>Production</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEnvironmentFilter('Staging')}>Staging</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEnvironmentFilter('Development')}>Development</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Date Range Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-gray-600">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      "Pick a date"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Refresh Button */}
              <Button variant="outline" size="sm" onClick={handleRefresh} className="text-gray-600">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile View - Card Layout */}
      {isMobile && (
        <div className="space-y-4">
          {processes.map((process) => (
            <Card key={process.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{process.name}</h3>
                    <p className="text-sm text-gray-500">{process.environment}</p>
                  </div>
                </div>
                {getStatusBadge(process.status)}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                <div>
                  <p className="font-medium text-gray-700">Created</p>
                  <p>{format(new Date(process.createdAt), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Last Run</p>
                  <p>{process.lastRun}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(process)} className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEdit(process)} className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Desktop View - Table Layout */}
      {!isMobile && (
        <Card className="border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-gray-50/50 border-b border-gray-200">
                  <TableHead className="py-3 font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      Process Name
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Environment</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      Status
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      Created At
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Last Run</TableHead>
                  <TableHead className="w-12 py-3 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process) => (
                  <TableRow 
                    key={process.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="font-medium py-4">
                      <div>
                        <p className="font-medium text-gray-900">{process.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{process.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{process.environment}</TableCell>
                    <TableCell className="py-4">{getStatusBadge(process.status)}</TableCell>
                    <TableCell className="py-4">{format(new Date(process.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="py-4">{process.lastRun}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDetails(process)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(process)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(process.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing 1-{processes.length} of {processes.length} processes</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="mx-2">Page 1 of 1</span>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Items per page</span>
                <select 
                  className="border border-gray-200 rounded p-1 text-sm bg-white"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Process Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Process Details</DialogTitle>
          </DialogHeader>
          {selectedProcess && (
            <ProcessDetailsModal 
              process={selectedProcess} 
              onClose={() => setIsDetailsModalOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Process Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Process</DialogTitle>
          </DialogHeader>
          {selectedProcess && (
            <ProcessForm 
              process={selectedProcess}
              onClose={() => setIsEditModalOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Processes;
