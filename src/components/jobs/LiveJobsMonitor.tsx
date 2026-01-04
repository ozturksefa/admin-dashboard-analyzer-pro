
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Clock, Server, Zap } from 'lucide-react';
import { Job } from '@/data/jobsData';

interface LiveJobsMonitorProps {
  jobs: Job[];
}

const LiveJobsMonitor = ({ jobs }: LiveJobsMonitorProps) => {
  const runningJobs = jobs.filter(j => j.state === 'Running');

  if (runningJobs.length === 0) {
    return (
      <Card className="p-6 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
          <h3 className="font-semibold text-foreground">Live Monitoring</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No jobs currently running</p>
          <p className="text-xs mt-1">Jobs will appear here when active</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <h3 className="font-semibold text-foreground">Live Monitoring</h3>
          <Badge variant="secondary" className="text-xs">{runningJobs.length} active</Badge>
        </div>
        <span className="text-xs text-muted-foreground">Auto-refresh: 5s</span>
      </div>

      <div className="space-y-3">
        {runningJobs.map((job) => (
          <div key={job.id} className="p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-info" />
                <span className="font-medium text-sm text-foreground">{job.name}</span>
              </div>
              <Badge className="bg-info/20 text-info border-info/30 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Running
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs mb-3">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Server className="h-3 w-3" />
                <span className="truncate">{job.machine}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{job.duration}</span>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-xs">
                  {job.priority}
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">
                  {Math.floor(Math.random() * 40 + 30)}%
                </span>
              </div>
              <Progress value={Math.floor(Math.random() * 40 + 30)} className="h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LiveJobsMonitor;
