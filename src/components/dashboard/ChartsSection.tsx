
import React from 'react';
import { DonutChart, BarChartComponent } from './Charts';
import ChartCard from './ChartCard';

const ChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Robot Utilization">
        <BarChartComponent />
      </ChartCard>
      
      <ChartCard title="Job Status Distribution">
        <DonutChart />
      </ChartCard>
    </div>
  );
};

export default ChartsSection;
