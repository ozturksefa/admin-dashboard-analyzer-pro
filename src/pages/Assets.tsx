
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Database, 
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
  Key,
  FileText,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'Text' | 'Bool' | 'Integer' | 'Credential';
  valueType: 'Single Value' | 'Per Robot';
  description: string;
  canBeUsedGlobally: boolean;
  hasValue: boolean;
}

const assets: Asset[] = [
  {
    id: '1',
    name: 'DatabaseConnectionString',
    type: 'Text',
    valueType: 'Single Value',
    description: 'Main database connection string for production environment',
    canBeUsedGlobally: true,
    hasValue: true
  },
  {
    id: '2',
    name: 'APICredentials',
    type: 'Credential',
    valueType: 'Single Value',
    description: 'API authentication credentials for external service integration',
    canBeUsedGlobally: false,
    hasValue: true
  },
  {
    id: '3',
    name: 'MaxRetryCount',
    type: 'Integer',
    valueType: 'Per Robot',
    description: 'Maximum number of retry attempts for failed operations',
    canBeUsedGlobally: true,
    hasValue: true
  },
  {
    id: '4',
    name: 'EnableLogging',
    type: 'Bool',
    valueType: 'Single Value',
    description: 'Global flag to enable or disable detailed logging',
    canBeUsedGlobally: true,
    hasValue: false
  }
];

const Assets = () => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
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
      setSelectedAssets(assets.map(asset => asset.id));
    } else {
      setSelectedAssets([]);
    }
  };

  const handleSelectAsset = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAssets([...selectedAssets, id]);
    } else {
      setSelectedAssets(selectedAssets.filter(assetId => assetId !== id));
    }
  };

  const getTypeIcon = (type: Asset['type']) => {
    switch (type) {
      case 'Text':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Credential':
        return <Key className="h-4 w-4 text-orange-500" />;
      case 'Integer':
        return <Database className="h-4 w-4 text-green-500" />;
      case 'Bool':
        return <Shield className="h-4 w-4 text-purple-500" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Assets</h1>
          <p className="text-sm text-gray-500 mt-1">Manage configuration values and credentials</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Create Asset
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
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
          {assets.map((asset) => (
            <Card key={asset.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(asset.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{asset.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span>{asset.type}</span>
                      {asset.hasValue ? (
                        <Eye className="ml-2 h-3 w-3 text-green-500" />
                      ) : (
                        <EyeOff className="ml-2 h-3 w-3 text-gray-400" />
                      )}
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
                    <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                    <DropdownMenuItem>Set Value</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                <p className="font-semibold">Description</p>
                <p className="line-clamp-2">{asset.description}</p>
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
                      checked={selectedAssets.length === assets.length && assets.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Name</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Type</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Value Type</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Global</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Has Value</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700 max-w-[300px]">Description</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow 
                    key={asset.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedAssets.includes(asset.id)}
                        onCheckedChange={(checked) => handleSelectAsset(asset.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(asset.type)}
                        {asset.name}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{asset.type}</TableCell>
                    <TableCell className="py-4">{asset.valueType}</TableCell>
                    <TableCell className="py-4">
                      {asset.canBeUsedGlobally ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      {asset.hasValue ? (
                        <Eye className="h-4 w-4 text-green-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="line-clamp-1 max-w-[300px] text-gray-700" title={asset.description}>
                        {asset.description}
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
                          <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                          <DropdownMenuItem>Set Value</DropdownMenuItem>
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
              <span>1 - 4 / 4</span>
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

export default Assets;
