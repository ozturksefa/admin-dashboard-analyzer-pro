
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, FileText } from 'lucide-react';

const JobsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Jobs</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor and manage automation jobs</p>
      </div>
      
      <div className="flex gap-3">
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Play className="mr-2 h-4 w-4" /> Start
        </Button>
        <Button size="sm" variant="outline" className="text-gray-600">
          <FileText className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default JobsHeader;
