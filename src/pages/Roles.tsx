
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Shield, 
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
  Users,
  Key,
  Eye,
  Edit
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isBuiltIn: boolean;
  createdDate: string;
  lastModified: string;
}

const roles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all administrative privileges',
    permissions: ['Create', 'Read', 'Update', 'Delete', 'Manage Users', 'System Settings'],
    userCount: 2,
    isBuiltIn: true,
    createdDate: '2023-01-01',
    lastModified: '2023-01-01'
  },
  {
    id: '2',
    name: 'Developer',
    description: 'Development and deployment access for automation processes',
    permissions: ['Create', 'Read', 'Update', 'Deploy Processes', 'View Logs'],
    userCount: 5,
    isBuiltIn: true,
    createdDate: '2023-01-01',
    lastModified: '2023-12-15'
  },
  {
    id: '3',
    name: 'Business User',
    description: 'Business process execution and monitoring access',
    permissions: ['Read', 'Execute Processes', 'View Reports'],
    userCount: 12,
    isBuiltIn: false,
    createdDate: '2023-03-15',
    lastModified: '2023-11-20'
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to processes and reports',
    permissions: ['Read', 'View Reports'],
    userCount: 8,
    isBuiltIn: false,
    createdDate: '2023-05-10',
    lastModified: '2023-10-05'
  }
];

const Roles = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
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
      setSelectedRoles(roles.map(role => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  const handleSelectRole = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, id]);
    } else {
      setSelectedRoles(selectedRoles.filter(roleId => roleId !== id));
    }
  };

  const getRoleIcon = (isBuiltIn: boolean) => {
    return isBuiltIn ? (
      <Shield className="h-4 w-4 text-blue-500" />
    ) : (
      <Key className="h-4 w-4 text-green-500" />
    );
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Roles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user roles and permissions</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Create Role
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search roles..."
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
          {roles.map((role) => (
            <Card key={role.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getRoleIcon(role.isBuiltIn)}
                  <div>
                    <h3 className="font-medium text-gray-900">{role.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{role.userCount} users</span>
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
                    <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                    {!role.isBuiltIn && <DropdownMenuItem>Delete Role</DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                <p className="font-semibold">Description</p>
                <p className="line-clamp-2">{role.description}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                    {permission}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-xs">
                    +{role.permissions.length - 3} more
                  </span>
                )}
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
                      checked={selectedRoles.length === roles.length && roles.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Role</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Description</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Permissions</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Users</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Type</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Last Modified</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow 
                    key={role.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedRoles.includes(role.id)}
                        onCheckedChange={(checked) => handleSelectRole(role.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(role.isBuiltIn)}
                        <span className="font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 max-w-[200px]">
                      <span className="line-clamp-2 text-gray-700" title={role.description}>
                        {role.description}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 max-w-[250px]">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 2 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-xs">
                            +{role.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{role.userCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {role.isBuiltIn ? (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">Built-in</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs">Custom</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">{role.lastModified}</TableCell>
                    <TableCell className="text-right py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Permissions
                          </DropdownMenuItem>
                          {!role.isBuiltIn && (
                            <DropdownMenuItem className="text-red-600">
                              Delete Role
                            </DropdownMenuItem>
                          )}
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

export default Roles;
