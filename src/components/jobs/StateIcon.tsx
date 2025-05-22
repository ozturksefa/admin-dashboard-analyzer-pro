
import React from 'react';
import { Check, Loader, StopCircle } from 'lucide-react';
import { Job } from '../../data/jobsData';

interface StateIconProps {
  state: Job['state'];
}

export const StateIcon = ({ state }: StateIconProps) => {
  switch (state) {
    case 'Successful':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'Pending':
      return <Loader className="h-5 w-5 text-amber-500 animate-spin" />;
    case 'Stopped':
      return <StopCircle className="h-5 w-5 text-gray-500" />;
  }
};

export default StateIcon;
