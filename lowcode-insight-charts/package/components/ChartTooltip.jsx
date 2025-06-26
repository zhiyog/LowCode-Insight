import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ChartTooltip = ({ active, payload, label }) => {
  const { theme } = useTheme();
  
  if (!active || !payload || !payload.length) {
    return null;
  }

  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`${bgColor} ${textColor} p-3 border ${borderColor} shadow-lg rounded-lg transition-all duration-200 transform scale-105`}>
      {label && <p className="font-medium mb-2 border-b pb-1 border-gray-300 dark:border-gray-600">{label}</p>}
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center py-1">
          <div 
            className="w-3 h-3 mr-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-medium">{entry.name}: </span>
          <span className="ml-1 font-bold">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
