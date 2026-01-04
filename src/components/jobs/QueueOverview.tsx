
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Layers, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Queue } from '@/data/jobsData';

interface QueueOverviewProps {
  queues: Queue[];
}

const QueueOverview = ({ queues }: QueueOverviewProps) => {
  // Sort queues by pending items (highest first)
  const sortedQueues = [...queues].sort((a, b) => b.itemsPending - a.itemsPending);
  const topQueues = sortedQueues.slice(0, 5);

  return (
    <Card className="p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-info" />
          <h3 className="font-semibold text-foreground">Queue Overview</h3>
        </div>
        <Badge variant="secondary" className="text-xs">{queues.length} queues</Badge>
      </div>

      <div className="space-y-3">
        {topQueues.map((queue) => {
          const successRate = queue.itemsTotal > 0 
            ? Math.round((queue.itemsProcessed / queue.itemsTotal) * 100) 
            : 0;
          
          return (
            <div key={queue.id} className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-foreground">{queue.name}</span>
                <span className="text-xs text-muted-foreground">{queue.itemsTotal} items</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span className="text-muted-foreground">{queue.itemsProcessed}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-warning" />
                  <span className="text-muted-foreground">{queue.itemsPending}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-destructive" />
                  <span className="text-muted-foreground">{queue.itemsFailed}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="text-foreground font-medium">{successRate}%</span>
                </div>
                <Progress value={successRate} className="h-1.5" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default QueueOverview;
