
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Bot, 
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
  Circle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Robot {
  id: string;
  name: string;
  machine: string;
  status: 'Connected' | 'Disconnected' | 'Busy';
  type: 'Attended' | 'Unattended';
  environment: string;
  lastSeen: string;
  version: string;
}

const robots: Robot[] = [
  {
    id: '1',
    name: 'Robot01',
    machine: 'DESKTOP-ABC123',
    status: 'Connected',
    type: 'Unattended',
    environment: 'Production',
    lastSeen: '2024-01-15 11:30:00',
    version: '2023.10.3'
  },
  {
    id: '2',
    name: 'Robot02',
    machine: 'DESKTOP-DEF456',
    status: 'Busy',
    type: 'Attended',
    environment: 'Development',
    lastSeen: '2024-01-15 11:25:00',
    version: '2023.10.3'
  },
  {
    id: '3',
    name: 'Robot03',
    machine: 'DESKTOP-GHI789',
    status: 'Disconnected',
    type: 'Unattended',
    environment: 'Production',
    lastSeen: '2024-01-15 09:15:00',
    version: '2023.10.2'
  }
];

const Robots = () => {
  const [selectedRobots, setSelectedRobots] = useState<string[]>([]);
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
      setSelectedRobots(robots.map(robot => robot.id));
    } else {
      setSelectedRobots([]);
    }
  };

  const handleSelectRobot = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRobots([...selectedRobots, id]);
    } else {
      setSelectedRobots(selectedRobots.filter(robotId => robotId !== id));
    }
  };

  const getStatusIcon = (status: Robot['status']) => {
    switch (status) {
      case 'Connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Busy':
        return <Circle className="h-4 w-4 text-blue-500 fill-current" />;
      case 'Disconnected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Robots</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your automation robots</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Robot
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search robots..."
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
          {robots.map((robot) => (
            <Card key={robot.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{robot.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      {getStatusIcon(robot.status)}
                      <span className="ml-1">{robot.status}</span>
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
                    <DropdownMenuItem>Start Job</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Machine</p>
                  <p>{robot.machine}</p>
                </div>
                <div>
                  <p className="font-semibold">Type</p>
                  <p>{robot.type}</p>
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
                      checked={selectedRobots.length === robots.length && robots.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Name</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Machine</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Status</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Type</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Environment</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Last Seen</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Version</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {robots.map((robot) => (
                  <TableRow 
                    key={robot.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedRobots.includes(robot.id)}
                        onCheckedChange={(checked) => handleSelectRobot(robot.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium py-4">{robot.name}</TableCell>
                    <TableCell className="py-4">{robot.machine}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(robot.status)}
                        <span>{robot.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{robot.type}</TableCell>
                    <TableCell className="py-4">{robot.environment}</TableCell>
                    <TableCell className="py-4">{robot.lastSeen}</TableCell>
                    <TableCell className="py-4">{robot.version}</TableCell>
                    <TableCell className="text-right py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Start Job</DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
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
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Items</span>
                <select className="border border-gray-200 rounded p-1 text-sm bg-white">
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Robots;
