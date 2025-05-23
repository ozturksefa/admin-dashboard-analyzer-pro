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
  Equal, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Columns,
  Calendar,
  RotateCcw
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

const tabs = [
  { id: 'processes', label: 'Processes', active: true },
  { id: 'jobs', label: 'Jobs', active: false },
  { id: 'apps', label: 'Apps', active: false },
  { id: 'triggers', label: 'Triggers', active: false },
  { id: 'packages', label: 'My Packages', active: false },
  { id: 'logs', label: 'Logs', active: false }
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
      <Check className="h-4 w-4 text-green-500" />
      <span>{version}</span>
    </div>
  );

  const getPriorityIcon = (priority: Process['priority']) => {
    return <Equal className="h-4 w-4 text-gray-500 ml-1" />;
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Processes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your automation processes</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Process
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  tab.active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Table Controls */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
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
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span>{process.version}</span>
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
                <TableRow className="hover:bg-gray-50/50 border-b border-gray-200">
                  <TableHead className="w-12 py-3">
                    <Checkbox 
                      checked={selectedProcesses.length === processes.length && processes.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      Name
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Type</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Version</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      Job priority
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Entry point</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700 max-w-[300px]">Description</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process) => (
                  <TableRow 
                    key={process.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedProcesses.includes(process.id)}
                        onCheckedChange={(checked) => handleSelectProcess(process.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium py-4">
                      {process.name}
                    </TableCell>
                    <TableCell className="py-4">{process.type}</TableCell>
                    <TableCell className="py-4">{getVersionBadge(process.version)}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center">
                        <Equal className="h-4 w-4 text-orange-500 mr-2" />
                        {process.priority}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{process.entryPoint}</TableCell>
                    <TableCell className="py-4">
                      <span className="line-clamp-1 max-w-[300px] text-gray-700" title={process.description}>
                        {process.description}
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
          
          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>1 - 1 / 1</span>
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
                <select 
                  className="border border-gray-200 rounded p-1 text-sm bg-white"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
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

export default Processes;
