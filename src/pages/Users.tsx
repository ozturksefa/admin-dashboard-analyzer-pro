
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Users as UsersIcon, 
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
  User,
  Shield,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  department: string;
  createdDate: string;
}

const users: User[] = [
  {
    id: '1',
    username: 'john.doe',
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2024-01-15 10:30:00',
    department: 'IT',
    createdDate: '2023-08-15'
  },
  {
    id: '2',
    username: 'jane.smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Developer',
    status: 'Active',
    lastLogin: '2024-01-15 09:15:00',
    department: 'Development',
    createdDate: '2023-09-20'
  },
  {
    id: '3',
    username: 'mike.johnson',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Business User',
    status: 'Inactive',
    lastLogin: '2024-01-10 14:22:00',
    department: 'Finance',
    createdDate: '2023-10-05'
  },
  {
    id: '4',
    username: 'sarah.wilson',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Viewer',
    status: 'Pending',
    lastLogin: 'Never',
    department: 'HR',
    createdDate: '2024-01-14'
  }
];

const Users = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
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
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return 'text-green-700 bg-green-50';
      case 'Inactive':
        return 'text-red-700 bg-red-50';
      case 'Pending':
        return 'text-orange-700 bg-orange-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role === 'Administrator') {
      return <Shield className="h-4 w-4 text-purple-500" />;
    }
    return <User className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user accounts and permissions</p>
        </div>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
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
          {users.map((user) => (
            <Card key={user.id} className="p-4 hover:bg-gray-50 transition-colors shadow-sm border border-[#F5F5F5] rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.fullName}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      {getStatusIcon(user.status)}
                      <span className="ml-1">{user.status}</span>
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
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="truncate">{user.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Role</p>
                  <div className="flex items-center gap-1">
                    {getRoleIcon(user.role)}
                    <span>{user.role}</span>
                  </div>
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
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                    />
                  </TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">User</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Username</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Email</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Role</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Status</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Department</TableHead>
                  <TableHead className="py-3 font-medium text-gray-700">Last Login</TableHead>
                  <TableHead className="w-12 py-3">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{user.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{user.username}</TableCell>
                    <TableCell className="py-4">{user.email}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(user.status)}
                        <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{user.department}</TableCell>
                    <TableCell className="py-4">{user.lastLogin}</TableCell>
                    <TableCell className="text-right py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
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

export default Users;
