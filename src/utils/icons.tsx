
import { 
  LayoutDashboard, 
  Robot, 
  Settings, 
  Users, 
  Calendar, 
  Briefcase, 
  FileStack, 
  Database, 
  AlertTriangle,
  LucideIcon,
  ShieldCheck
} from "lucide-react";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  href: string;
};

export const sidebarItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Robots",
    icon: Robot,
    href: "/robots",
  },
  {
    title: "Processes",
    icon: FileStack,
    href: "/processes",
  },
  {
    title: "Schedules",
    icon: Calendar,
    href: "/schedules",
  },
  {
    title: "Jobs",
    icon: Briefcase,
    href: "/jobs",
  },
  {
    title: "Queues",
    icon: FileStack,
    href: "/queues",
  },
  {
    title: "Assets",
    icon: Database,
    href: "/assets",
  },
  {
    title: "Exceptions",
    icon: AlertTriangle,
    href: "/exceptions",
  },
];

export const adminItems: NavItem[] = [
  {
    title: "Users",
    icon: Users,
    href: "/users",
  },
  {
    title: "Roles",
    icon: ShieldCheck,
    href: "/roles",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
