
import React, { useState, useMemo } from 'react';
import JobsHeader from '../components/jobs/JobsHeader';
import JobsFilters from '../components/jobs/JobsFilters';
import JobsTable from '../components/jobs/JobsTable';
import JobsCardView from '../components/jobs/JobsCardView';
import MonitoringStats from '../components/jobs/MonitoringStats';
import LiveJobsMonitor from '../components/jobs/LiveJobsMonitor';
import QueueOverview from '../components/jobs/QueueOverview';
import ExceptionsSummary from '../components/jobs/ExceptionsSummary';
import { jobsData, queuesData } from '../data/jobsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List } from 'lucide-react';

const Jobs = () => {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  // Handle window resize for responsive layout
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter jobs based on active filter and search query
  const filteredJobs = useMemo(() => {
    let filtered = jobsData;

    // Apply state filter
    if (activeFilter !== 'all') {
      const filterMap: Record<string, string[]> = {
        running: ['Running'],
        successful: ['Successful'],
        pending: ['Pending'],
        faulted: ['Faulted', 'Stopped'],
      };
      filtered = filtered.filter(job => filterMap[activeFilter]?.includes(job.state));
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.name.toLowerCase().includes(query) ||
        job.machine.toLowerCase().includes(query) ||
        job.queueName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(filteredJobs.map(job => job.id));
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

  const handleRefresh = () => {
    setLastUpdated('Just now');
    // In real app, this would fetch fresh data
  };

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <JobsHeader onRefresh={handleRefresh} lastUpdated={lastUpdated} />
      
      {/* Monitoring Stats */}
      <MonitoringStats jobs={jobsData} queues={queuesData} />

      {/* Live Monitoring Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LiveJobsMonitor jobs={jobsData} />
        <QueueOverview queues={queuesData} />
        <ExceptionsSummary jobs={jobsData} />
      </div>

      {/* Jobs List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">All Jobs</h2>
          {!isMobile && (
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-background shadow-sm' : ''}`}
              >
                <List className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded ${viewMode === 'cards' ? 'bg-background shadow-sm' : ''}`}
              >
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        <JobsFilters 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {isMobile || viewMode === 'cards' ? (
          <JobsCardView jobs={filteredJobs} />
        ) : (
          <JobsTable 
            jobs={filteredJobs} 
            selectedJobs={selectedJobs} 
            handleSelectAll={handleSelectAll} 
            handleSelectJob={handleSelectJob} 
          />
        )}
      </div>
    </div>
  );
};

export default Jobs;
