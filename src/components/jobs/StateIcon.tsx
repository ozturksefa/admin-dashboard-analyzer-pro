
import React from 'react';
import { CheckCircle, Clock, StopCircle, Play, XCircle } from 'lucide-react';
import { Job } from '../../data/jobsData';

interface StateIconProps {
  state: Job['state'];
}

export const StateIcon = ({ state }: StateIconProps) => {
  switch (state) {
    case 'Successful':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'Running':
      return <Play className="h-4 w-4 text-info fill-info" />;
    case 'Pending':
      return <Clock className="h-4 w-4 text-warning" />;
    case 'Stopped':
      return <StopCircle className="h-4 w-4 text-muted-foreground" />;
    case 'Faulted':
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
};

export default StateIcon;
