
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

const suggestions = [
  {
    id: 1,
    title: "Optimize Robot Utilization",
    description: "Robot A has low utilization (45%). Consider reassigning tasks from overloaded robots.",
    priority: "high",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Schedule Optimization",
    description: "Peak hours show job queuing. Consider adjusting schedules to distribute load evenly.",
    priority: "medium",
    icon: Lightbulb,
    color: "text-amber-600"
  },
  {
    id: 3,
    title: "Error Pattern Detected",
    description: "Process 'Invoice Processing' shows recurring timeouts. Review automation logic.",
    priority: "high",
    icon: AlertTriangle,
    color: "text-red-600"
  },
  {
    id: 4,
    title: "Performance Improvement",
    description: "Adding parallel processing could improve throughput by up to 40%.",
    priority: "medium",
    icon: TrendingUp,
    color: "text-green-600"
  }
];

const AISuggestions = () => {
  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all duration-200 cursor-pointer hover:border-gray-200"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-gray-50 ${suggestion.color}`}>
                  <suggestion.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{suggestion.description}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      suggestion.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {suggestion.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
