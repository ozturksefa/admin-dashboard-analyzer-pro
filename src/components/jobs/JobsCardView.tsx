
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bot, MoreVertical, Clock, Server } from 'lucide-react';
import { Job } from '../../data/jobsData';
import StateIcon from './StateIcon';

interface JobsCardViewProps {
  jobs: Job[];
}

const JobsCardView = ({ jobs }: JobsCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-4 bg-card hover:shadow-md transition-all border-border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{job.name}</h3>
                <p className="text-xs text-muted-foreground">{job.type}</p>
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
                <DropdownMenuItem>View Logs</DropdownMenuItem>
                <DropdownMenuItem>Stop Job</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <StateIcon state={job.state} />
              <span>{job.state}</span>
            </Badge>
            {job.exceptionType && (
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  job.exceptionType === 'System' 
                    ? 'border-destructive/50 text-destructive' 
                    : 'border-warning/50 text-warning'
                }`}
              >
                {job.exceptionType}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5" />
              <span className="truncate">{job.machine}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-mono">{job.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <Badge variant="secondary" className="text-xs">{job.source}</Badge>
            <Badge variant="outline" className="text-xs">{job.queueName || '-'}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobsCardView;
