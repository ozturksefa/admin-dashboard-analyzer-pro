import React from 'react';
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock, Building2, Users } from 'lucide-react';

interface ExecutiveChartsProps {
  timeFilter: 'daily' | 'weekly' | 'monthly';
}

// ROI Trend Over Time
export const ROITrendChart: React.FC<ExecutiveChartsProps> = ({ timeFilter }) => {
  const chartData = {
    daily: [
      { name: '6 AM', roi: 245, savings: 1200, target: 250 },
      { name: '9 AM', roi: 268, savings: 1800, target: 250 },
      { name: '12 PM', roi: 285, savings: 2400, target: 250 },
      { name: '3 PM', roi: 295, savings: 3100, target: 250 },
      { name: '6 PM', roi: 310, savings: 3800, target: 250 },
      { name: '9 PM', roi: 285, savings: 4250, target: 250 },
    ],
    weekly: [
      { name: 'Mon', roi: 275, savings: 4200, target: 300 },
      { name: 'Tue', roi: 290, savings: 4800, target: 300 },
      { name: 'Wed', roi: 305, savings: 5100, target: 300 },
      { name: 'Thu', roi: 298, savings: 4900, target: 300 },
      { name: 'Fri', roi: 318, savings: 5500, target: 300 },
      { name: 'Sat', roi: 285, savings: 2200, target: 300 },
      { name: 'Sun', roi: 270, savings: 1800, target: 300 },
    ],
    monthly: [
      { name: 'Week 1', roi: 285, savings: 28000, target: 350 },
      { name: 'Week 2', roi: 312, savings: 32000, target: 350 },
      { name: 'Week 3', roi: 338, savings: 35000, target: 350 },
      { name: 'Week 4', roi: 345, savings: 30000, target: 350 },
    ],
  };

  const data = chartData[timeFilter];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis 
          yAxisId="left"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
          label={{ value: 'ROI %', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          label={{ value: 'Savings $', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name) => {
            if (name === 'roi' || name === 'target') return [`${value}%`, name === 'roi' ? 'ROI' : 'Target'];
            return [`$${value.toLocaleString()}`, 'Savings'];
          }}
        />
        <Legend />
        <Area 
          yAxisId="left"
          type="monotone" 
          dataKey="roi" 
          stroke="#10B981" 
          strokeWidth={3}
          fill="url(#roiGradient)" 
          name="ROI"
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="target" 
          stroke="#6366F1" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Target"
          dot={false}
        />
        <Bar yAxisId="right" dataKey="savings" fill="#3B82F6" opacity={0.7} radius={[4, 4, 0, 0]} name="Savings" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// Cost Savings by Department
export const DepartmentSavingsChart: React.FC<ExecutiveChartsProps> = ({ timeFilter }) => {
  const chartData = {
    daily: [
      { name: 'Finance', savings: 1250, hours: 4.5, color: '#3B82F6' },
      { name: 'HR', savings: 890, hours: 3.2, color: '#8B5CF6' },
      { name: 'Operations', savings: 1100, hours: 3.8, color: '#10B981' },
      { name: 'IT', savings: 650, hours: 2.1, color: '#F59E0B' },
      { name: 'Sales', savings: 360, hours: 1.4, color: '#EF4444' },
    ],
    weekly: [
      { name: 'Finance', savings: 8500, hours: 32, color: '#3B82F6' },
      { name: 'HR', savings: 6200, hours: 24, color: '#8B5CF6' },
      { name: 'Operations', savings: 7800, hours: 28, color: '#10B981' },
      { name: 'IT', savings: 4200, hours: 16, color: '#F59E0B' },
      { name: 'Sales', savings: 1800, hours: 8, color: '#EF4444' },
    ],
    monthly: [
      { name: 'Finance', savings: 38000, hours: 140, color: '#3B82F6' },
      { name: 'HR', savings: 28000, hours: 105, color: '#8B5CF6' },
      { name: 'Operations', savings: 32000, hours: 120, color: '#10B981' },
      { name: 'IT', savings: 18000, hours: 68, color: '#F59E0B' },
      { name: 'Sales', savings: 9000, hours: 35, color: '#EF4444' },
    ],
  };

  const data = chartData[timeFilter];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
        <XAxis 
          type="number" 
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
          tickFormatter={(value) => `$${value >= 1000 ? `${(value/1000).toFixed(0)}K` : value}`}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
          width={80} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name) => {
            if (name === 'savings') return [`$${Number(value).toLocaleString()}`, 'Cost Savings'];
            return [`${value} hours`, 'FTE Saved'];
          }}
        />
        <Legend />
        <Bar dataKey="savings" name="Cost Savings" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// FTE Savings Breakdown
export const FTESavingsChart: React.FC<ExecutiveChartsProps> = ({ timeFilter }) => {
  const chartData = {
    daily: [
      { name: 'Data Entry', value: 3.5, fill: '#3B82F6' },
      { name: 'Report Generation', value: 2.8, fill: '#10B981' },
      { name: 'Invoice Processing', value: 2.2, fill: '#8B5CF6' },
      { name: 'Email Processing', value: 2.0, fill: '#F59E0B' },
      { name: 'Other Tasks', value: 2.0, fill: '#EF4444' },
    ],
    weekly: [
      { name: 'Data Entry', value: 25, fill: '#3B82F6' },
      { name: 'Report Generation', value: 20, fill: '#10B981' },
      { name: 'Invoice Processing', value: 18, fill: '#8B5CF6' },
      { name: 'Email Processing', value: 14, fill: '#F59E0B' },
      { name: 'Other Tasks', value: 8, fill: '#EF4444' },
    ],
    monthly: [
      { name: 'Data Entry', value: 120, fill: '#3B82F6' },
      { name: 'Report Generation', value: 95, fill: '#10B981' },
      { name: 'Invoice Processing', value: 75, fill: '#8B5CF6' },
      { name: 'Email Processing', value: 55, fill: '#F59E0B' },
      { name: 'Other Tasks', value: 35, fill: '#EF4444' },
    ],
  };

  const data = chartData[timeFilter];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value) => [`${value} hours`, 'FTE Saved']}
        />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          formatter={(value, entry: any) => {
            const item = data.find(d => d.name === value);
            const percentage = item ? ((item.value / total) * 100).toFixed(0) : 0;
            return `${value} (${percentage}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Automation Performance Gauge
export const PerformanceGaugeChart: React.FC<ExecutiveChartsProps> = ({ timeFilter }) => {
  const metrics = {
    daily: [
      { name: 'Success Rate', value: 94.2, fill: '#10B981' },
      { name: 'Utilization', value: 82, fill: '#3B82F6' },
      { name: 'Compliance', value: 99.8, fill: '#8B5CF6' },
      { name: 'Uptime', value: 99.5, fill: '#F59E0B' },
    ],
    weekly: [
      { name: 'Success Rate', value: 96.1, fill: '#10B981' },
      { name: 'Utilization', value: 85, fill: '#3B82F6' },
      { name: 'Compliance', value: 99.9, fill: '#8B5CF6' },
      { name: 'Uptime', value: 99.7, fill: '#F59E0B' },
    ],
    monthly: [
      { name: 'Success Rate', value: 97.5, fill: '#10B981' },
      { name: 'Utilization', value: 88, fill: '#3B82F6' },
      { name: 'Compliance', value: 99.95, fill: '#8B5CF6' },
      { name: 'Uptime', value: 99.8, fill: '#F59E0B' },
    ],
  };

  const data = metrics[timeFilter];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart 
        cx="50%" 
        cy="50%" 
        innerRadius="30%" 
        outerRadius="90%" 
        barSize={15} 
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          label={{ 
            position: 'insideStart', 
            fill: 'hsl(var(--foreground))',
            fontSize: 11
          }}
          background={{ fill: 'hsl(var(--muted))' }}
          dataKey="value"
        />
        <Legend 
          iconSize={10} 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value, entry: any) => {
            const item = data.find(d => d.name === value);
            return `${value}: ${item?.value}%`;
          }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value) => [`${value}%`, 'Score']}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

// Transactions Volume Chart
export const TransactionsVolumeChart: React.FC<ExecutiveChartsProps> = ({ timeFilter }) => {
  const chartData = {
    daily: [
      { name: '6 AM', transactions: 145, value: 12500 },
      { name: '9 AM', transactions: 328, value: 28000 },
      { name: '12 PM', transactions: 456, value: 42000 },
      { name: '3 PM', transactions: 512, value: 48000 },
      { name: '6 PM', transactions: 389, value: 35000 },
      { name: '9 PM', transactions: 187, value: 16500 },
    ],
    weekly: [
      { name: 'Mon', transactions: 2450, value: 210000 },
      { name: 'Tue', transactions: 2890, value: 248000 },
      { name: 'Wed', transactions: 3120, value: 265000 },
      { name: 'Thu', transactions: 2980, value: 255000 },
      { name: 'Fri', transactions: 3250, value: 285000 },
      { name: 'Sat', transactions: 1280, value: 110000 },
      { name: 'Sun', transactions: 890, value: 78000 },
    ],
    monthly: [
      { name: 'Week 1', transactions: 15600, value: 1250000 },
      { name: 'Week 2', transactions: 18200, value: 1480000 },
      { name: 'Week 3', transactions: 19800, value: 1620000 },
      { name: 'Week 4', transactions: 17400, value: 1420000 },
    ],
  };

  const data = chartData[timeFilter];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="transactionsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
        <YAxis 
          yAxisId="left"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
          tickFormatter={(value) => `$${value >= 1000000 ? `${(value/1000000).toFixed(1)}M` : value >= 1000 ? `${(value/1000).toFixed(0)}K` : value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name) => {
            if (name === 'transactions') return [value.toLocaleString(), 'Transactions'];
            return [`$${value.toLocaleString()}`, 'Value'];
          }}
        />
        <Legend />
        <Area 
          yAxisId="left"
          type="monotone" 
          dataKey="transactions" 
          stroke="#3B82F6" 
          strokeWidth={2}
          fill="url(#transactionsGradient)"
          name="Transactions"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="value" 
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default {
  ROITrendChart,
  DepartmentSavingsChart,
  FTESavingsChart,
  PerformanceGaugeChart,
  TransactionsVolumeChart,
};
