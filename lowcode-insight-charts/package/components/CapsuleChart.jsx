import React, { useState, useEffect } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const CapsuleChart = ({ 
  data = [], 
  xDataKey = "name", 
  dataKeys = ["value"],
  colors = [], 
  showGrid = true,
  showLegend = true,
  isGrouped = false,
  height = 300,
  animate = true,
  tooltip = true,
  className = ""
}) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState([]);
  
  // 默认颜色
  const defaultColors = theme === 'dark' 
    ? ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'] 
    : ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];
  
  const chartColors = colors.length > 0 ? colors : defaultColors;
  
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
        <RechartsBarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={isGrouped ? 4 : 0}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#555' : '#ccc'} />}
          <XAxis dataKey={xDataKey} stroke={theme === 'dark' ? '#ddd' : '#666'} />
          <YAxis stroke={theme === 'dark' ? '#ddd' : '#666'} />
          
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend />}
          
          {dataKeys.map((dataKey, index) => (
            <Bar 
              key={index}
              dataKey={dataKey}
              stackId={isGrouped ? undefined : "stack"}
              fill={chartColors[index % chartColors.length]}
              radius={[20, 20, 20, 20]}
              barSize={isGrouped ? 20 : 30}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CapsuleChart;
