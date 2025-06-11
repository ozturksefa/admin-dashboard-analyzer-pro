
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProcessesPage from "./features/rpa/pages/ProcessesPage";
import Jobs from "./pages/Jobs";
import Queues from "./pages/Queues";
import Assets from "./pages/Assets";
import Exceptions from "./pages/Exceptions";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
          <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/robots" element={<DashboardLayout><div>Robots Page</div></DashboardLayout>} />
          <Route path="/processes" element={<DashboardLayout><ProcessesPage /></DashboardLayout>} />
          <Route path="/schedules" element={<DashboardLayout><div>Schedules Page</div></DashboardLayout>} />
          <Route path="/jobs" element={<DashboardLayout><Jobs /></DashboardLayout>} />
          <Route path="/queues" element={<DashboardLayout><Queues /></DashboardLayout>} />
          <Route path="/assets" element={<DashboardLayout><Assets /></DashboardLayout>} />
          <Route path="/exceptions" element={<DashboardLayout><Exceptions /></DashboardLayout>} />
          <Route path="/users" element={<DashboardLayout><Users /></DashboardLayout>} />
          <Route path="/roles" element={<DashboardLayout><Roles /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
