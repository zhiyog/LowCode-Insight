import React, { useState, useEffect } from 'react';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const RadarChart = ({ 
  data = [], 
  nameKey = "subject", 
  radars = [{ dataKey: "value", color: "#8884d8", name: "数值" }],
  showLegend = true,
  height = 300,
  animate = true,
  tooltip = true,
  fillOpacity = 0.2,
  strokeWidth = 2,
  className = ""
}) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  
  useEffect(() => {
    if (animate) {
      setChartData([]);
      const timer = setTimeout(() => {
        setChartData(data);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setChartData(data);
    }
  }, [data, animate]);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke={theme === 'dark' ? '#555' : '#ccc'} />
          <PolarAngleAxis dataKey={nameKey} tick={{ fill: theme === 'dark' ? '#ddd' : '#666' }} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke={theme === 'dark' ? '#ddd' : '#666'} />
          
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend />}
          
          {radars.map((radar, index) => (
            <Radar 
              key={index}
              name={radar.name || radar.dataKey}
              dataKey={radar.dataKey}
              stroke={radar.color}
              fill={radar.color}
              fillOpacity={fillOpacity}
              strokeWidth={activeIndex === index ? strokeWidth + 1 : strokeWidth}
              animationDuration={1500}
              animationEasing="ease-out"
              onMouseEnter={(_, idx) => handleMouseEnter(_, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                filter: activeIndex === index ? 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))' : 'none',
                cursor: 'pointer',
                opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                transition: 'opacity 0.3s, filter 0.3s, stroke-width 0.3s'
              }}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default RadarChart;
