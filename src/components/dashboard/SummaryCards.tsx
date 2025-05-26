
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Bot, 
  Calendar, 
  Users,
} from 'lucide-react';
import SummaryCard from './SummaryCard';

interface SummaryCardsProps {
  dashboardData: {
    jobsCompleted: number;
    activeRobots: number;
    upcomingSchedules: number;
    registeredUsers: number;
  };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ dashboardData }) => {
  const navigate = useNavigate();

  const summaryCards = [
    {
      title: "Jobs Completed",
      value: dashboardData.jobsCompleted,
      icon: CheckCircle,
      iconColor: "#10B981",
      onClick: () => navigate('/jobs')
    },
    {
      title: "Active Robots",
      value: dashboardData.activeRobots,
      icon: Bot,
      iconColor: "#3B82F6",
      onClick: () => navigate('/robots')
    },
    {
      title: "Upcoming Schedules",
      value: dashboardData.upcomingSchedules,
      icon: Calendar,
      iconColor: "#F59E0B",
      onClick: () => navigate('/schedules')
    },
    {
      title: "Registered Users",
      value: dashboardData.registeredUsers,
      icon: Users,
      iconColor: "#8B5CF6",
      onClick: () => navigate('/users')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          iconColor={card.iconColor}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};

export default SummaryCards;
