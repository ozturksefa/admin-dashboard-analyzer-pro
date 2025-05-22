
import React, { useState } from 'react';
import JobsHeader from '../components/jobs/JobsHeader';
import JobsFilters from '../components/jobs/JobsFilters';
import JobsTable from '../components/jobs/JobsTable';
import JobsCardView from '../components/jobs/JobsCardView';
import { jobsData } from '../data/jobsData';

const Jobs = () => {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive layout
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(jobsData.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, id]);
    } else {
      setSelectedJobs(selectedJobs.filter(jobId => jobId !== id));
    }
  };

  return (
    <div className="max-w-full">
      <JobsHeader />
      
      <JobsFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {isMobile ? (
        <JobsCardView jobs={jobsData} />
      ) : (
        <JobsTable 
          jobs={jobsData} 
          selectedJobs={selectedJobs} 
          handleSelectAll={handleSelectAll} 
          handleSelectJob={handleSelectJob} 
        />
      )}
    </div>
  );
};

export default Jobs;
