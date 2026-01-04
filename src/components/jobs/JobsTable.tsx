
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bot, MoreVertical, ArrowRight, ArrowUp, ArrowDown, Info, Clock } from 'lucide-react';
import { Job } from '../../data/jobsData';
import StateIcon from './StateIcon';

interface JobsTableProps {
  jobs: Job[];
  selectedJobs: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectJob: (id: string, checked: boolean) => void;
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'High':
      return <ArrowUp className="h-3 w-3 text-destructive" />;
    case 'Low':
      return <ArrowDown className="h-3 w-3 text-muted-foreground" />;
    default:
      return <ArrowRight className="h-3 w-3 text-muted-foreground" />;
  }
};

const getPriorityBadge = (priority: string) => {
  const variants: Record<string, string> = {
    High: 'bg-destructive/10 text-destructive border-destructive/20',
    Normal: 'bg-muted text-muted-foreground border-border',
    Low: 'bg-muted/50 text-muted-foreground border-border',
  };
  return variants[priority] || variants.Normal;
};

const JobsTable = ({ 
  jobs, 
  selectedJobs, 
  handleSelectAll, 
  handleSelectJob 
}: JobsTableProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/30">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                />
              </TableHead>
              <TableHead className="text-foreground font-semibold">Process Name</TableHead>
              <TableHead className="text-foreground font-semibold">Machine</TableHead>
              <TableHead className="text-foreground font-semibold">Queue</TableHead>
              <TableHead className="text-foreground font-semibold">State</TableHead>
              <TableHead className="text-foreground font-semibold">Duration</TableHead>
              <TableHead className="text-foreground font-semibold">Priority</TableHead>
              <TableHead className="text-foreground font-semibold">Source</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow 
                key={job.id}
                className="hover:bg-muted/30 border-b border-border"
              >
                <TableCell>
                  <Checkbox 
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={(checked) => handleSelectJob(job.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-primary/10">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <span className="text-foreground">{job.name}</span>
                      <p className="text-xs text-muted-foreground">{job.type}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{job.machine}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-normal">
                    {job.queueName || '-'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <StateIcon state={job.state} />
                    <span className="text-sm">{job.state}</span>
                    {job.exceptionType && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ml-1 ${
                          job.exceptionType === 'System' 
                            ? 'border-destructive/50 text-destructive' 
                            : 'border-warning/50 text-warning'
                        }`}
                      >
                        {job.exceptionType}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-mono text-foreground">{job.duration}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${getPriorityBadge(job.priority)}`}>
                    {getPriorityIcon(job.priority)}
                    <span className="ml-1">{job.priority}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {job.source}
                  </Badge>
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
                      <DropdownMenuItem>View Logs</DropdownMenuItem>
                      <DropdownMenuItem>Stop Job</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
