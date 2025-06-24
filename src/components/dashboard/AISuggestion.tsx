
import React from 'react';
import { Bot, ChevronRight, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AISuggestionProps {
  id: number;
  process: string;
  suggestion: string;
  confidence: number;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  estimatedSaving: string;
}

const AISuggestion: React.FC<AISuggestionProps> = ({ 
  id,
  process, 
  suggestion, 
  confidence,
  category,
  impact,
  estimatedSaving 
}) => {
  const getConfidenceColor = () => {
    if (confidence >= 90) return 'text-emerald-600';
    if (confidence >= 70) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getImpactColor = () => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="group p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{process}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {category}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getImpactColor()}`}>
                {impact} Impact
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className={`text-sm font-medium ${getConfidenceColor()}`}>
              {confidence}% Confidence
            </div>
            <div className="text-xs text-gray-500">
              Save {estimatedSaving}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {suggestion}
      </p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-green-600">
          <ArrowUp className="h-3 w-3" />
          <span className="text-xs font-medium">Potential improvement</span>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
          Apply Suggestion
        </Button>
      </div>
    </div>
  );
};

export default AISuggestion;
