
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bot, MoreVertical, ArrowRight, Info } from 'lucide-react';
import { Job } from '../../data/jobsData';
import StateIcon from './StateIcon';

interface JobsTableProps {
  jobs: Job[];
  selectedJobs: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectJob: (id: string, checked: boolean) => void;
}

const JobsTable = ({ 
  jobs, 
  selectedJobs, 
  handleSelectAll, 
  handleSelectJob 
}: JobsTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-[#F5F5F5] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-gray-50/50">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
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
              <TableHead className="w-12">Info</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow 
                key={job.id}
                className="hover:bg-gray-50 border-b border-gray-100"
              >
                <TableCell>
                  <Checkbox 
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={(checked) => handleSelectJob(job.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-gray-500" />
                    {job.name}
                  </div>
                </TableCell>
                <TableCell>{job.machine}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <StateIcon state={job.state} />
                    <span>{job.state}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span>{job.priority}</span>
                    {job.priority === 'Normal' && <ArrowRight className="h-4 w-4" />}
                  </div>
                </TableCell>
                <TableCell>{job.started}</TableCell>
                <TableCell>{job.ended}</TableCell>
                <TableCell>{job.source}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4 text-gray-500" />
                  </Button>
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
                      <DropdownMenuItem>Stop Job</DropdownMenuItem>
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
  );
};

export default JobsTable;
