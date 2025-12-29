import { 
  LayoutDashboard, 
  Bot, 
  Play, 
  Calendar, 
  Briefcase, 
  ListOrdered, 
  Package, 
  AlertCircle,
  Users,
  Shield,
  Settings,
  TrendingUp
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    title: "Executive Dashboard",
    href: "/executive",
    icon: TrendingUp
  },
  {
    title: "Robots",
    href: "/robots",
    icon: Bot
  },
  {
    title: "Processes",
    href: "/processes",
    icon: Play
  },
  {
    title: "Schedules",
    href: "/schedules",
    icon: Calendar
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase
  },
  {
    title: "Queues",
    href: "/queues",
    icon: ListOrdered
  },
  {
    title: "Assets",
    href: "/assets",
    icon: Package
  },
  {
    title: "Exceptions",
    href: "/exceptions",
    icon: AlertCircle
  },
];

export const adminItems = [
  {
    title: "Users",
    href: "/users",
    icon: Users
  },
  {
    title: "Roles",
    href: "/roles",
    icon: Shield
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
];
