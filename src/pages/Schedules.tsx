
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Filter, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Search,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Pause
} from 'lucide-react';

interface Schedule {
  id: string;
  name: string;
  process: string;
  trigger: string;
  nextRun: string;
  status: 'Active' | 'Inactive' | 'Paused';
  robot: string;
  frequency: string;
}

const schedules: Schedule[] = [
  {
    id: '1',
    name: 'Daily Report Generation',
    process: 'ReportAutomation',
    trigger: 'Time',
    nextRun: '2024-01-16 09:00:00',
    status: 'Active',
    robot: 'Robot01',
    frequency: 'Daily'
  },
  {
    id: '2',
    name: 'Weekly Backup Process',
    process: 'DataBackup',
    trigger: 'Time',
    nextRun: '2024-01-21 18:00:00',
    status: 'Active',
    robot: 'Robot02',
    frequency: 'Weekly'
  },
  {
    id: '3',
    name: 'Invoice Processing',
    process: 'InvoiceProcessing',
    trigger: 'Queue',
    nextRun: 'On demand',
    status: 'Paused',
    robot: 'Robot03',
    frequency: 'Queue based'
  }
];

const Schedules = () => {
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
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
      setSelectedSchedules(schedules.map(schedule => schedule.id));
    } else {
      setSelectedSchedules([]);
    }
  };

  const handleSelectSchedule = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSchedules([...selectedSchedules, id]);
    } else {
      setSelectedSchedules(selectedSchedules.filter(scheduleId => scheduleId !== id));
    }
  };

  const getStatusIcon = (status: Schedule['status']) => {
    switch (status) {
      case 'Active':
        return <Play className="h-4 w-4 text-green-500" />;
      case 'Paused':
        return <Pause className="h-4 w-4 text-orange-500" />;
      case 'Inactive':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Schedules</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage automation schedules</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Create Schedule
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search schedules..."
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
          {schedules.map((schedule) => (
            <Card key={schedule.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{schedule.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      {getStatusIcon(schedule.status)}
                      <span className="ml-1">{schedule.status}</span>
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
                    <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Run Now</DropdownMenuItem>
                    <DropdownMenuItem>Disable</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Process</p>
                  <p>{schedule.process}</p>
                </div>
                <div>
                  <p className="font-semibold">Next Run</p>
                  <p>{schedule.nextRun}</p>
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
                      checked={selectedSchedules.length === schedules.length && schedules.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Name</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Process</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Trigger</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Status</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Next Run</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Robot</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Frequency</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow 
                    key={schedule.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedSchedules.includes(schedule.id)}
                        onCheckedChange={(checked) => handleSelectSchedule(schedule.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium py-4">{schedule.name}</TableCell>
                    <TableCell className="py-4">{schedule.process}</TableCell>
                    <TableCell className="py-4">{schedule.trigger}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(schedule.status)}
                        <span>{schedule.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{schedule.nextRun}</TableCell>
                    <TableCell className="py-4">{schedule.robot}</TableCell>
                    <TableCell className="py-4">{schedule.frequency}</TableCell>
                    <TableCell className="text-right py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Run Now</DropdownMenuItem>
                          <DropdownMenuItem>Disable</DropdownMenuItem>
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

export default Schedules;
