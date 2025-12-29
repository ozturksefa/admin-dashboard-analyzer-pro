import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExecutiveKPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change: number;
  changeLabel?: string;
  icon: ReactNode;
  iconBgColor?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  size?: 'default' | 'large';
  prefix?: string;
  suffix?: string;
  sparklineData?: number[];
  target?: { value: number; label: string };
}

const ExecutiveKPICard: React.FC<ExecutiveKPICardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeLabel = 'vs last period',
  icon,
  iconBgColor,
  variant = 'default',
  size = 'default',
  prefix,
  suffix,
  sparklineData,
  target,
}) => {
  const isPositive = change >= 0;

  const variantStyles = {
    default: 'from-slate-500 to-slate-600',
    success: 'from-emerald-500 to-emerald-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-rose-500 to-rose-600',
    info: 'from-blue-500 to-blue-600',
    primary: 'from-indigo-500 to-indigo-600',
  };

  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const height = 40;
    const width = 100;
    const step = width / (sparklineData.length - 1);
    
    const points = sparklineData
      .map((val, i) => {
        const x = i * step;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="opacity-50">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className="text-primary/60"
        />
      </svg>
    );
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 bg-card group",
      size === 'large' && "col-span-2"
    )}>
      {/* Gradient accent bar */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
        iconBgColor ? '' : variantStyles[variant]
      )} style={iconBgColor ? { background: `linear-gradient(to right, ${iconBgColor}, ${iconBgColor})` } : undefined} />
      
      <CardContent className={cn(
        "relative",
        size === 'large' ? 'p-8' : 'p-6'
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "flex items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
            size === 'large' ? 'w-14 h-14' : 'w-12 h-12',
            iconBgColor ? '' : variantStyles[variant]
          )} style={iconBgColor ? { background: `linear-gradient(to bottom right, ${iconBgColor}, ${iconBgColor})` } : undefined}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          
          {/* Sparkline */}
          <div className="hidden md:block">
            {renderSparkline()}
          </div>
        </div>

        {/* Title */}
        <p className={cn(
          "text-muted-foreground font-medium uppercase tracking-wide mb-2",
          size === 'large' ? 'text-sm' : 'text-xs'
        )}>
          {title}
        </p>

        {/* Value */}
        <div className="flex items-baseline gap-1 mb-1">
          {prefix && <span className="text-muted-foreground text-lg">{prefix}</span>}
          <h3 className={cn(
            "font-bold text-card-foreground tracking-tight",
            size === 'large' ? 'text-4xl' : 'text-3xl'
          )}>
            {value}
          </h3>
          {suffix && <span className="text-muted-foreground text-lg ml-0.5">{suffix}</span>}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
        )}

        {/* Change indicator */}
        <div className="flex items-center justify-between mt-3">
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold",
            isPositive 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' 
              : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
          )}>
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>

        {/* Target progress */}
        {target && (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Target: {target.label}</span>
              <span className="font-medium text-card-foreground">
                {Math.min(100, Math.round((Number(value.toString().replace(/[^0-9.]/g, '')) / target.value) * 100))}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500 bg-gradient-to-r",
                  iconBgColor ? '' : variantStyles[variant]
                )}
                style={{ 
                  width: `${Math.min(100, Math.round((Number(value.toString().replace(/[^0-9.]/g, '')) / target.value) * 100))}%`,
                  ...(iconBgColor ? { background: iconBgColor } : {})
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutiveKPICard;
