
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, RefreshCcw, Calendar, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ProcessForm from '../components/ProcessForm';
import ProcessDetailsModal from '../components/ProcessDetailsModal';

const ProcessesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [environmentFilter, setEnvironmentFilter] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showAddProcess, setShowAddProcess] = useState(false);
  const [showProcessDetails, setShowProcessDetails] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<any>(null);
  const [editingProcess, setEditingProcess] = useState<any>(null);

  // Mock data
  const processes = [
    {
      id: '1',
      name: 'Invoice Processing',
      environment: 'Production',
      status: 'Active',
      createdAt: '2024-01-15',
      lastRun: '2024-01-20 14:30',
      description: 'Automated invoice processing workflow'
    },
    {
      id: '2',
      name: 'Data Migration',
      environment: 'Development',
      status: 'Inactive',
      createdAt: '2024-01-10',
      lastRun: '2024-01-18 09:15',
      description: 'Customer data migration process'
    },
    {
      id: '3',
      name: 'Report Generation',
      environment: 'Production',
      status: 'Active',
      createdAt: '2024-01-05',
      lastRun: '2024-01-20 16:45',
      description: 'Monthly report generation automation'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Error': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const handleRefresh = () => {
    console.log('Refreshing processes...');
  };

  const handleViewDetails = (process: any) => {
    setSelectedProcess(process);
    setShowProcessDetails(true);
  };

  const handleEdit = (process: any) => {
    setEditingProcess(process);
    setShowAddProcess(true);
  };

  const handleDelete = (processId: string) => {
    if (confirm('Are you sure you want to delete this process?')) {
      console.log('Deleting process:', processId);
    }
  };

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Processes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your RPA processes and workflows</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowAddProcess(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Process
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search processes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>

            <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Processes Table */}
      <Card className="border border-[#F5F5F5] shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-900">
            Process List ({processes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process Name</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{process.environment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(process.status)}>
                      {process.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{process.createdAt}</TableCell>
                  <TableCell>{process.lastRun}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(process)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(process)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(process.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Process Modal */}
      {showAddProcess && (
        <ProcessForm 
          isOpen={showAddProcess}
          onClose={() => {
            setShowAddProcess(false);
            setEditingProcess(null);
          }}
          process={editingProcess}
        />
      )}

      {/* Process Details Modal */}
      {showProcessDetails && selectedProcess && (
        <ProcessDetailsModal
          isOpen={showProcessDetails}
          onClose={() => {
            setShowProcessDetails(false);
            setSelectedProcess(null);
          }}
          process={selectedProcess}
        />
      )}
    </div>
  );
};

export default ProcessesPage;
