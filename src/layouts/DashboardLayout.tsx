
import React, { useState, ReactNode } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] font-[Inter,sans-serif]">
      <Header />
      <div className="flex flex-1">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          
          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-white" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>
            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <Sidebar />
            </div>
          </div>
        </div>
        
        {/* Desktop sidebar */}
        <Sidebar />
        
        {/* Main content */}
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

export default DashboardLayout;
