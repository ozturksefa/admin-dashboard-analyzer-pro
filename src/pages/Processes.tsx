
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Filter, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Check, 
  Equals, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Columns
} from 'lucide-react';

interface Process {
  id: string;
  name: string;
  type: string;
  version: string;
  priority: 'High' | 'Medium' | 'Low';
  entryPoint: string;
  description: string;
}

const processes: Process[] = [
  {
    id: '1',
    name: 'GenAICase003',
    type: 'RPA',
    version: '1.0.7',
    priority: 'Medium',
    entryPoint: 'Main.xaml',
    description: 'Satış ve İnsan Kaynakları power BI raporlarından içgörü çıkaran ve özetleme yapan akıllı süreç.'
  },
  {
    id: '2',
    name: 'InvoiceProcessing',
    type: 'RPA',
    version: '2.1.3',
    priority: 'High',
    entryPoint: 'Process.xaml',
    description: 'Otomatik fatura işleme süreçleri için AI destekli OCR tabanlı doküman işleme sistemi.'
  },
  {
    id: '3',
    name: 'CustomerOnboarding',
    type: 'Workflow',
    version: '0.9.5',
    priority: 'Low',
    entryPoint: 'Onboarding.xaml',
    description: 'Yeni müşterilerin sistem entegrasyonu ve ilk veri girişlerinin otomatikleştirilmesi.'
  },
  {
    id: '4',
    name: 'ReportAutomation',
    type: 'RPA',
    version: '1.2.0',
    priority: 'Medium',
    entryPoint: 'Dashboard.xaml',
    description: 'Haftalık ve aylık performans raporlarını hazırlayan ve ilgili paydaşlara e-posta ile dağıtan otomasyon.'
  },
  {
    id: '5',
    name: 'HRDataSynchronization',
    type: 'Integration',
    version: '3.0.1',
    priority: 'High',
    entryPoint: 'SyncData.xaml',
    description: 'İnsan kaynakları veritabanı ile ERP sistemi arasında çift yönlü veri senkronizasyonu sağlayan entegrasyon.'
  }
];

const Processes = () => {
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

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

  const getVersionBadge = (version: string) => (
    <div className="flex items-center gap-1.5">
      <span>{version}</span>
      <Check className="h-4 w-4 text-green-500" />
    </div>
  );

  const getPriorityIcon = (priority: Process['priority']) => {
    return <Equals className="h-4 w-4 text-gray-500 ml-1" />;
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
            <Card key={process.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{process.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span className="mr-2">Version: {process.version}</span>
                      <Check className="h-4 w-4 text-green-500" />
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
                  <p className="font-semibold">Entry Point</p>
                  <p>{process.entryPoint}</p>
                </div>
                <div>
                  <p className="font-semibold">Priority</p>
                  <p className="flex items-center">{process.priority} {getPriorityIcon(process.priority)}</p>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Entry Point</TableHead>
                  <TableHead className="max-w-[300px]">Description</TableHead>
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
                    <TableCell>{process.type}</TableCell>
                    <TableCell>{getVersionBadge(process.version)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {process.priority}
                        {getPriorityIcon(process.priority)}
                      </div>
                    </TableCell>
                    <TableCell>{process.entryPoint}</TableCell>
                    <TableCell>
                      <span className="line-clamp-1 max-w-[300px]" title={process.description}>
                        {process.description}
                      </span>
                    </TableCell>
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
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Items per page:</span>
              <select 
                className="border border-gray-200 rounded p-1 text-sm"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Page {currentPage} of 1</span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled className="p-0 w-8 h-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled className="p-0 w-8 h-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Processes;
