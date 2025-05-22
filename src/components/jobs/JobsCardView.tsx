
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bot, MoreVertical } from 'lucide-react';
import { Job } from '../../data/jobsData';
import StateIcon from './StateIcon';

interface JobsCardViewProps {
  jobs: Job[];
}

const JobsCardView = ({ jobs }: JobsCardViewProps) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-gray-500" />
              <div>
                <h3 className="font-medium text-gray-900">{job.name}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <StateIcon state={job.state} />
                  <span className="ml-1">{job.state}</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Stop Job</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>
              <p className="font-semibold">Started</p>
              <p>{job.started}</p>
            </div>
            <div>
              <p className="font-semibold">Source</p>
              <p>{job.source}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View details
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default JobsCardView;
