import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  Zap,
  Target,
  Award,
  BarChart3
} from 'lucide-react';
import ExecutiveKPICard from './ExecutiveKPICard';

interface ExecutiveSummaryProps {
  timeFilter: 'daily' | 'weekly' | 'monthly';
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ timeFilter }) => {
  const summaryData = {
    daily: {
      totalROI: 285,
      roiChange: 12,
      costSavings: 4250,
      costChange: 8,
      fteSaved: 12.5,
      fteChange: 15,
      transactionsValue: 8750,
      transactionsChange: 10,
      automationRate: 94.2,
      automationChange: 2,
      avgCycleTime: 2.3,
      cycleChange: -8,
      complianceRate: 99.8,
      complianceChange: 0.2,
      botUptime: 99.5,
      uptimeChange: 0.1,
    },
    weekly: {
      totalROI: 312,
      roiChange: 18,
      costSavings: 28500,
      costChange: 12,
      fteSaved: 85,
      fteChange: 22,
      transactionsValue: 58200,
      transactionsChange: 15,
      automationRate: 96.1,
      automationChange: 3,
      avgCycleTime: 2.1,
      cycleChange: -12,
      complianceRate: 99.9,
      complianceChange: 0.1,
      botUptime: 99.7,
      uptimeChange: 0.2,
    },
    monthly: {
      totalROI: 345,
      roiChange: 25,
      costSavings: 125000,
      costChange: 18,
      fteSaved: 380,
      fteChange: 35,
      transactionsValue: 245000,
      transactionsChange: 22,
      automationRate: 97.5,
      automationChange: 5,
      avgCycleTime: 1.8,
      cycleChange: -18,
      complianceRate: 99.95,
      complianceChange: 0.05,
      botUptime: 99.8,
      uptimeChange: 0.3,
    },
  };

  const data = summaryData[timeFilter];
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const getPeriodLabel = () => {
    switch (timeFilter) {
      case 'daily': return 'vs yesterday';
      case 'weekly': return 'vs last week';
      case 'monthly': return 'vs last month';
    }
  };

  const sparklineData = {
    roi: [180, 210, 245, 260, 285, 312, 345],
    cost: [85, 92, 98, 110, 118, 125, 145],
    fte: [220, 280, 310, 340, 360, 380, 420],
    transactions: [150, 180, 195, 210, 225, 240, 265],
  };

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Executive Summary</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Key automation performance indicators at a glance
          </p>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
          <Zap className="h-3 w-3 mr-1" />
          All Systems Operational
        </Badge>
      </div>

      {/* Primary KPIs - Financial Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExecutiveKPICard
          title="Total ROI"
          value={data.totalROI}
          suffix="%"
          change={data.roiChange}
          changeLabel={getPeriodLabel()}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="success"
          sparklineData={sparklineData.roi}
          target={{ value: 400, label: '400% Annual Target' }}
        />
        
        <ExecutiveKPICard
          title="Cost Savings"
          value={formatCurrency(data.costSavings)}
          prefix="$"
          change={data.costChange}
          changeLabel={getPeriodLabel()}
          icon={<DollarSign className="h-6 w-6" />}
          variant="primary"
          sparklineData={sparklineData.cost}
          target={{ value: 150, label: '$150K Target' }}
        />
        
        <ExecutiveKPICard
          title="FTE Hours Saved"
          value={data.fteSaved}
          suffix="hrs"
          change={data.fteChange}
          changeLabel={getPeriodLabel()}
          icon={<Clock className="h-6 w-6" />}
          variant="info"
          sparklineData={sparklineData.fte}
        />
        
        <ExecutiveKPICard
          title="Transactions Value"
          value={formatCurrency(data.transactionsValue)}
          prefix="$"
          change={data.transactionsChange}
          changeLabel={getPeriodLabel()}
          icon={<BarChart3 className="h-6 w-6" />}
          variant="warning"
          sparklineData={sparklineData.transactions}
        />
      </div>

      {/* Secondary KPIs - Operational Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExecutiveKPICard
          title="Automation Success Rate"
          value={data.automationRate}
          suffix="%"
          change={data.automationChange}
          changeLabel={getPeriodLabel()}
          icon={<Target className="h-5 w-5" />}
          iconBgColor="#10B981"
        />
        
        <ExecutiveKPICard
          title="Avg. Cycle Time"
          value={data.avgCycleTime}
          suffix="min"
          change={data.cycleChange}
          changeLabel={getPeriodLabel()}
          icon={<Zap className="h-5 w-5" />}
          iconBgColor="#8B5CF6"
        />
        
        <ExecutiveKPICard
          title="Compliance Rate"
          value={data.complianceRate}
          suffix="%"
          change={data.complianceChange}
          changeLabel={getPeriodLabel()}
          icon={<Award className="h-5 w-5" />}
          iconBgColor="#6366F1"
        />
        
        <ExecutiveKPICard
          title="Bot Uptime"
          value={data.botUptime}
          suffix="%"
          change={data.uptimeChange}
          changeLabel={getPeriodLabel()}
          icon={<Users className="h-5 w-5" />}
          iconBgColor="#0EA5E9"
        />
      </div>
    </div>
  );
};

export default ExecutiveSummary;
