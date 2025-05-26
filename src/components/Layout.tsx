
import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 4, 1), // May 1, 2025
    to: new Date(2025, 4, 31)   // May 31, 2025
  });

  const handleRefresh = () => {
    console.log('Refreshing dashboard data...');
    // This will trigger a refresh in child components
    window.dispatchEvent(new CustomEvent('dashboard-refresh'));
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    console.log('Date range changed:', range);
    // This will trigger a date range change in child components
    window.dispatchEvent(new CustomEvent('date-range-change', { detail: range }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-[Inter,sans-serif]">
      <Header 
        onRefresh={handleRefresh}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      <div className="flex flex-1">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <Sidebar />
            </div>
          </div>
        </div>
        
        <Sidebar />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <div className="md:hidden mb-4">
            <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5 mr-2" />
              Menu
            </Button>
          </div>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
