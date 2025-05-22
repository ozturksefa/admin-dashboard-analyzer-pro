
import React from 'react';

interface AISuggestionProps {
  process: string;
  suggestion: string;
  confidence: number;
}

const AISuggestion: React.FC<AISuggestionProps> = ({ process, suggestion, confidence }) => {
  // Determine the confidence level color
  const getConfidenceColor = () => {
    if (confidence >= 90) return 'text-emerald-600';
    if (confidence >= 70) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-800">Süreç: {process}</h3>
        <span className={`font-medium ${getConfidenceColor()}`}>
          Güven Skoru: {confidence}%
        </span>
      </div>
      <p className="text-gray-600">
        Öneri: {suggestion}
      </p>
    </div>
  );
};

export default AISuggestion;
