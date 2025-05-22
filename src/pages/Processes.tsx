
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Filter, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Check, 
  Loader, 
  StopCircle, 
  ArrowRight,
  Columns,
  Search
} from 'lucide-react';

interface Process {
  id: string;
  name: string;
  machine: string;
  type: string;
  state: 'Successful' | 'Pending' | 'Stopped';
  priority: 'High' | 'Normal' | 'Low';
  started: string;
  ended: string;
  source: 'Manual' | 'Assistant';
}

const processes: Process[] = [
  {
    id: '1',
    name: 'Hello.Orchestrator2',
    machine: 'DESKTOP-******',
    type: 'RPA Developer Pro',
    state: 'Successful',
    priority: 'Normal',
    started: '3 minutes ago',
    ended: '3 minutes ago',
    source: 'Manual'
  },
  {
    id: '2',
    name: 'Invoice.Processing',
    machine: 'SERVER-******',
    type: 'Development',
    state: 'Pending',
    priority: 'High',
    started: '15 minutes ago',
    ended: '-',
    source: 'Assistant'
  },
  {
    id: '3',
    name: 'Customer.Onboarding',
    machine: 'CLOUD-******',
    type: 'RPA Developer Pro',
    state: 'Stopped',
    priority: 'Low',
    started: '1 hour ago',
    ended: '45 minutes ago',
    source: 'Manual'
  },
  {
    id: '4',
    name: 'Data.Extraction',
    machine: 'SERVER-******',
    type: 'Development',
    state: 'Successful',
    priority: 'Normal',
    started: '2 hours ago',
    ended: '1 hour ago',
    source: 'Assistant'
  },
  {
    id: '5',
    name: 'Report.Generation',
    machine: 'DESKTOP-******',
    type: 'RPA Developer Pro',
    state: 'Successful',
    priority: 'High',
    started: '5 hours ago',
    ended: '4 hours ago',
    source: 'Manual'
  }
];

const Processes = () => {
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive layout
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProcesses(processes.map(process => process.id));
    } else {
      setSelectedProcesses([]);
    }
  };

  const handleSelectProcess = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProcesses([...selectedProcesses, id]);
    } else {
      setSelectedProcesses(selectedProcesses.filter(processId => processId !== id));
    }
  };

  const StateIcon = ({ state }: { state: Process['state'] }) => {
    switch (state) {
      case 'Successful':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <Loader className="h-5 w-5 text-amber-500 animate-spin" />;
      case 'Stopped':
        return <StopCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Processes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your automation processes</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Process
        </Button>
      </div>

      {/* Table Controls */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search processes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full sm:w-[250px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Columns className="mr-2 h-4 w-4" /> Columns
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600 px-3">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      {isMobile && (
        <div className="space-y-4">
          {processes.map((process) => (
            <Card key={process.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{process.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <StateIcon state={process.state} />
                      <span className="ml-1">{process.state}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Started</p>
                  <p>{process.started}</p>
                </div>
                <div>
                  <p className="font-semibold">Source</p>
                  <p>{process.source}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View details
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Desktop View - Table Layout */}
      {!isMobile && (
        <div className="bg-white rounded-xl border border-[#F5F5F5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-gray-50/50">
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedProcesses.length === processes.length && processes.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead>Process Name</TableHead>
                  <TableHead>Connected Machine</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Ended</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process) => (
                  <TableRow 
                    key={process.id}
                    className="hover:bg-gray-50 border-b border-gray-100"
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedProcesses.includes(process.id)}
                        onCheckedChange={(checked) => handleSelectProcess(process.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        {process.name}
                      </div>
                    </TableCell>
                    <TableCell>{process.machine}</TableCell>
                    <TableCell>{process.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <StateIcon state={process.state} />
                        <span>{process.state}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span>{process.priority}</span>
                        {process.priority === 'Normal' && <ArrowRight className="h-4 w-4" />}
                      </div>
                    </TableCell>
                    <TableCell>{process.started}</TableCell>
                    <TableCell>{process.ended}</TableCell>
                    <TableCell>{process.source}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Processes;
