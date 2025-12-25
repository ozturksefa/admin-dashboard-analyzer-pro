
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DraggableWidgetProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  headerActions?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  title,
  icon,
  children,
  isCollapsed = false,
  onToggleCollapse,
  headerActions,
  className,
  noPadding = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "border border-border shadow-sm rounded-xl bg-card",
        isDragging && "opacity-50 shadow-lg z-50",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded text-muted-foreground"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          {icon && <span>{icon}</span>}
          <CardTitle className="text-lg font-medium text-card-foreground">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {headerActions}
          {onToggleCollapse && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleCollapse}>
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className={noPadding ? "p-0" : ""}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default DraggableWidget;
