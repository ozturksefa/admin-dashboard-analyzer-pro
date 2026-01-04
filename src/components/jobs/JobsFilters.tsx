
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Columns, Search, CheckCircle2, Play, Clock, XCircle, AlertTriangle } from 'lucide-react';

interface JobsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const JobsFilters = ({ searchQuery, setSearchQuery, activeFilter = 'all', onFilterChange }: JobsFiltersProps) => {
  const filters = [
    { id: 'all', label: 'All Jobs', icon: null },
    { id: 'running', label: 'Running', icon: <Play className="h-3 w-3" />, color: 'text-info' },
    { id: 'successful', label: 'Successful', icon: <CheckCircle2 className="h-3 w-3" />, color: 'text-success' },
    { id: 'pending', label: 'Pending', icon: <Clock className="h-3 w-3" />, color: 'text-warning' },
    { id: 'faulted', label: 'Faulted', icon: <XCircle className="h-3 w-3" />, color: 'text-destructive' },
  ];

  return (
    <div className="bg-card p-4 mb-4 rounded-xl border border-border shadow-sm space-y-3">
      {/* Search and Actions Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs, machines, queues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full sm:w-[300px] border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <Columns className="mr-2 h-4 w-4" /> Columns
          </Button>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange?.(filter.id)}
            className={`h-8 whitespace-nowrap ${
              activeFilter === filter.id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filter.icon && <span className={`mr-1.5 ${filter.color}`}>{filter.icon}</span>}
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobsFilters;
