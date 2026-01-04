
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, RefreshCw, Activity } from 'lucide-react';

interface JobsHeaderProps {
  onRefresh?: () => void;
  lastUpdated?: string;
}

const JobsHeader = ({ onRefresh, lastUpdated }: JobsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-foreground">RPA Monitoring</h1>
            <Badge variant="secondary" className="text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
              Live
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time automation monitoring • Last updated: {lastUpdated || 'Just now'}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onRefresh} className="text-muted-foreground">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Play className="mr-2 h-4 w-4" /> Start Job
        </Button>
        <Button size="sm" variant="outline" className="text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default JobsHeader;
