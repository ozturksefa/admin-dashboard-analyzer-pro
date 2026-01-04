
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, XCircle, Clock, Bot } from 'lucide-react';
import { Job } from '@/data/jobsData';

interface ExceptionsSummaryProps {
  jobs: Job[];
}

const ExceptionsSummary = ({ jobs }: ExceptionsSummaryProps) => {
  const faultedJobs = jobs.filter(j => j.state === 'Faulted' || j.exceptionType);

  if (faultedJobs.length === 0) {
    return (
      <Card className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="font-semibold text-foreground">Recent Exceptions</h3>
        </div>
        <div className="text-center py-6 text-muted-foreground">
          <CheckCircle className="h-10 w-10 mx-auto mb-2 text-success opacity-50" />
          <p className="text-sm">No exceptions</p>
          <p className="text-xs mt-1">All systems running smoothly</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="font-semibold text-foreground">Recent Exceptions</h3>
        </div>
        <Badge variant="destructive" className="text-xs">{faultedJobs.length} issues</Badge>
      </div>

      <div className="space-y-3">
        {faultedJobs.map((job) => (
          <div 
            key={job.id} 
            className={`p-3 rounded-lg border ${
              job.exceptionType === 'System' 
                ? 'bg-destructive/5 border-destructive/20' 
                : 'bg-warning/5 border-warning/20'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm text-foreground">{job.name}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  job.exceptionType === 'System' 
                    ? 'border-destructive/50 text-destructive' 
                    : 'border-warning/50 text-warning'
                }`}
              >
                {job.exceptionType === 'System' ? (
                  <XCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                )}
                {job.exceptionType}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="truncate">{job.machine}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{job.ended}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Need to import CheckCircle for the empty state
import { CheckCircle } from 'lucide-react';

export default ExceptionsSummary;
