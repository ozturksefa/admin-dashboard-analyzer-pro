
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, Columns, RefreshCw, Search } from 'lucide-react';

interface JobsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const JobsFilters = ({ searchQuery, setSearchQuery }: JobsFiltersProps) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-xl border border-[#F5F5F5] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-4 py-2 w-full sm:w-[250px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
        />
      </div>
      
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
        <Button variant="outline" size="sm" className="text-gray-600">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
        <Button variant="outline" size="sm" className="text-gray-600">
          <Columns className="mr-2 h-4 w-4" /> Columns
        </Button>
        <Button variant="outline" size="sm" className="text-gray-600 px-3">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default JobsFilters;
