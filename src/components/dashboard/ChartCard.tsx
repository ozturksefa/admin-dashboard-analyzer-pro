
import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  height?: string;
}

const ChartCard = ({ title, children, height = "h-[270px]" }: ChartCardProps) => {
  return (
    <div className={`bg-white ${height} p-6 rounded-xl border border-[#F5F5F5] shadow-sm`}>
      <h2 className="text-base font-normal text-[#171717]">{title}</h2>
      <div className="mt-4 flex items-center justify-center h-[180px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
