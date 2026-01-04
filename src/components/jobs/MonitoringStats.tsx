
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Layers, 
  Play, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Job, Queue } from '@/data/jobsData';

interface MonitoringStatsProps {
  jobs: Job[];
  queues: Queue[];
}

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  colorClass: string;
  bgClass: string;
}

const StatCard = ({ title, value, subtitle, icon, trend, colorClass, bgClass }: StatCardProps) => (
  <Card className={`p-4 border-l-4 ${colorClass} bg-card hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <span className={`flex items-center text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
              {trend.value}%
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className={`p-2.5 rounded-lg ${bgClass}`}>
        {icon}
      </div>
    </div>
  </Card>
);

const MonitoringStats = ({ jobs, queues }: MonitoringStatsProps) => {
  // Calculate job statistics
  const successfulJobs = jobs.filter(j => j.state === 'Successful').length;
  const runningJobs = jobs.filter(j => j.state === 'Running').length;
  const pendingJobs = jobs.filter(j => j.state === 'Pending').length;
  const businessExceptions = jobs.filter(j => j.exceptionType === 'Business').length;
  const systemExceptions = jobs.filter(j => j.exceptionType === 'System').length;
  const totalExceptions = businessExceptions + systemExceptions;

  // Calculate queue statistics
  const totalQueueItems = queues.reduce((acc, q) => acc + q.itemsTotal, 0);
  const pendingQueueItems = queues.reduce((acc, q) => acc + q.itemsPending, 0);
  const processedQueueItems = queues.reduce((acc, q) => acc + q.itemsProcessed, 0);

  // Calculate average duration (mock data)
  const avgDuration = '00:18:42';
  const successRate = jobs.length > 0 ? Math.round((successfulJobs / jobs.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Primary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard
          title="Total Queues"
          value={queues.length}
          subtitle={`${totalQueueItems.toLocaleString()} items`}
          icon={<Layers className="h-5 w-5 text-info" />}
          colorClass="border-l-info"
          bgClass="bg-info/10"
        />
        <StatCard
          title="Successful"
          value={successfulJobs}
          subtitle={`${successRate}% success rate`}
          icon={<CheckCircle2 className="h-5 w-5 text-success" />}
          trend={{ value: 12, isPositive: true }}
          colorClass="border-l-success"
          bgClass="bg-success/10"
        />
        <StatCard
          title="Running"
          value={runningJobs}
          subtitle="Active now"
          icon={<Play className="h-5 w-5 text-info" />}
          colorClass="border-l-info"
          bgClass="bg-info/10"
        />
        <StatCard
          title="Pending"
          value={pendingJobs + pendingQueueItems}
          subtitle="In queue"
          icon={<Clock className="h-5 w-5 text-warning" />}
          colorClass="border-l-warning"
          bgClass="bg-warning/10"
        />
        <StatCard
          title="Business Exc."
          value={businessExceptions}
          subtitle="Rule violations"
          icon={<AlertTriangle className="h-5 w-5 text-warning" />}
          trend={businessExceptions > 0 ? { value: 5, isPositive: false } : undefined}
          colorClass="border-l-warning"
          bgClass="bg-warning/10"
        />
        <StatCard
          title="System Exc."
          value={systemExceptions}
          subtitle="Technical errors"
          icon={<XCircle className="h-5 w-5 text-destructive" />}
          trend={systemExceptions > 0 ? { value: 8, isPositive: false } : undefined}
          colorClass="border-l-destructive"
          bgClass="bg-destructive/10"
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Avg Duration</p>
              <p className="text-lg font-semibold text-foreground">{avgDuration}</p>
            </div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
        <Card className="p-3 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Queue Processed</p>
              <p className="text-lg font-semibold text-foreground">{processedQueueItems.toLocaleString()}</p>
            </div>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
        </Card>
        <Card className="p-3 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Exceptions</p>
              <p className="text-lg font-semibold text-foreground">{totalExceptions}</p>
            </div>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </div>
        </Card>
        <Card className="p-3 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active Robots</p>
              <p className="text-lg font-semibold text-foreground">{runningJobs}</p>
            </div>
            <Play className="h-4 w-4 text-info" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MonitoringStats;
