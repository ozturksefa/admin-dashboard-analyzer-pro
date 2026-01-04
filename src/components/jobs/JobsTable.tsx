
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Bot, MoreVertical, ArrowRight, ArrowUp, ArrowDown, Clock, ChevronDown, ChevronRight, Cpu, HardDrive, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
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
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/30">
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)} 
                />
              </TableHead>
              <TableHead className="text-foreground font-semibold">Process</TableHead>
              <TableHead className="text-foreground font-semibold">State</TableHead>
              <TableHead className="text-foreground font-semibold text-center">Transactions</TableHead>
              <TableHead className="text-foreground font-semibold text-center">Success Rate</TableHead>
              <TableHead className="text-foreground font-semibold">Duration</TableHead>
              <TableHead className="text-foreground font-semibold text-center">Resources</TableHead>
              <TableHead className="text-foreground font-semibold">Priority</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => {
              const isExpanded = expandedRows.includes(job.id);
              const successRate = job.transactionsTotal > 0 
                ? Math.round((job.transactionsSuccessful / job.transactionsTotal) * 100) 
                : 0;

              return (
                <React.Fragment key={job.id}>
                  <TableRow className="hover:bg-muted/30 border-b border-border">
                    <TableCell className="p-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => toggleRow(job.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
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
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{job.machine}</span>
                            <Badge variant="outline" className="text-[10px] px-1 py-0">
                              {job.queueName || '-'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <StateIcon state={job.state} />
                          <span className="text-sm">{job.state}</span>
                        </div>
                        {job.exceptionType && (
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] w-fit ${
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
                      <div className="flex items-center justify-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-success">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{job.transactionsSuccessful}</span>
                        </div>
                        <div className="flex items-center gap-1 text-destructive">
                          <XCircle className="h-3 w-3" />
                          <span>{job.transactionsFailed}</span>
                        </div>
                        <div className="text-muted-foreground">
                          / {job.transactionsTotal}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-24 mx-auto">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={successRate >= 90 ? 'text-success' : successRate >= 70 ? 'text-warning' : 'text-destructive'}>
                            {successRate}%
                          </span>
                        </div>
                        <Progress 
                          value={successRate} 
                          className={`h-1.5 ${
                            successRate >= 90 ? '[&>div]:bg-success' : 
                            successRate >= 70 ? '[&>div]:bg-warning' : 
                            '[&>div]:bg-destructive'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="font-mono text-foreground">{job.duration}</span>
                      </div>
                      {job.retryCount > 0 && (
                        <div className="flex items-center gap-1 text-xs text-warning mt-0.5">
                          <RefreshCw className="h-3 w-3" />
                          <span>{job.retryCount} retries</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Cpu className="h-3 w-3 text-muted-foreground" />
                          <span className={job.cpuUsage > 70 ? 'text-warning' : 'text-muted-foreground'}>
                            {job.cpuUsage}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="h-3 w-3 text-muted-foreground" />
                          <span className={job.memoryUsage > 700 ? 'text-warning' : 'text-muted-foreground'}>
                            {job.memoryUsage}MB
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getPriorityBadge(job.priority)}`}>
                        {getPriorityIcon(job.priority)}
                        <span className="ml-1">{job.priority}</span>
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

                  {/* Expanded Details Row */}
                  {isExpanded && (
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={10} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Input Arguments */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <ArrowRight className="h-4 w-4 text-info" />
                              Input Arguments
                            </h4>
                            <div className="bg-background rounded-lg p-3 border border-border">
                              {job.inputArgs ? (
                                <div className="space-y-1.5">
                                  {Object.entries(job.inputArgs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-xs">
                                      <span className="text-muted-foreground">{key}:</span>
                                      <span className="text-foreground font-mono">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">No input arguments</span>
                              )}
                            </div>
                          </div>

                          {/* Output Data */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              Output Data
                            </h4>
                            <div className="bg-background rounded-lg p-3 border border-border">
                              {job.outputData ? (
                                <div className="space-y-1.5">
                                  {Object.entries(job.outputData).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-xs">
                                      <span className="text-muted-foreground">{key}:</span>
                                      <span className="text-foreground font-mono">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  {job.state === 'Running' ? 'Job in progress...' : 'No output data'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Execution Details */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              Execution Details
                            </h4>
                            <div className="bg-background rounded-lg p-3 border border-border space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Started:</span>
                                <span className="text-foreground">{job.started}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Ended:</span>
                                <span className="text-foreground">{job.ended}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Source:</span>
                                <Badge variant="secondary" className="text-[10px]">{job.source}</Badge>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Items Processed:</span>
                                <span className="text-foreground font-semibold">{job.itemsProcessed}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Error Message */}
                        {job.errorMessage && (
                          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-destructive">Error Message</p>
                                <p className="text-xs text-destructive/80 mt-1">{job.errorMessage}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobsTable;
