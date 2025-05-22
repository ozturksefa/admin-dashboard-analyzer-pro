
import React, { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  height?: string;
}

const ChartCard = ({ title, children, height = "h-[350px]" }: ChartCardProps) => {
  return (
    <div className={`bg-white ${height} p-6 rounded-xl border border-[#F5F5F5] shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-[#171717]">{title}</h2>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      <div className="mt-2 h-[calc(100%-3rem)]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
