import React, { useState, useEffect } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const LineChart = ({ 
  data = [], 
  xDataKey = "name", 
  lines = [{ dataKey: "value", color: "#8884d8", name: "数值" }],
  showGrid = true,
  showLegend = true,
  height = 300,
  animate = true,
  tooltip = true,
  smooth = true,
  strokeWidth = 2,
  dot = true,
  type = "monotone",
  className = ""
}) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState([]);
  
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#555' : '#ccc'} />}
          <XAxis dataKey={xDataKey} stroke={theme === 'dark' ? '#ddd' : '#666'} />
          <YAxis stroke={theme === 'dark' ? '#ddd' : '#666'} />
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend />}
          
          {lines.map((line, index) => (
            <Line 
              key={index}
              type={type}
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color}
              strokeWidth={strokeWidth}
              dot={dot ? { 
                r: 4, 
                strokeWidth: 1, 
                fill: theme === 'dark' ? '#333' : '#fff',
                stroke: line.color 
              } : false}
              activeDot={{ 
                r: 8, 
                stroke: line.color,
                strokeWidth: 1,
                fill: theme === 'dark' ? '#333' : '#fff'
              }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LineChart;
