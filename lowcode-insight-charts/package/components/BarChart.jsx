import React, { useState, useEffect } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const BarChart = ({ 
  data = [], 
  xDataKey = "name", 
  dataKey = "value", 
  colors = [], 
  showGrid = true,
  showLegend = true,
  isHorizontal = false,
  barSize = 20,
  barGap = 4,
  barRadius = [4, 4, 0, 0],
  height = 300,
  animate = true,
  tooltip = true,
  className = ""
}) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  
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
        <RechartsBarChart
          data={chartData}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={barGap}
          barSize={barSize}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#555' : '#ccc'} />}
          
          {isHorizontal ? (
            <>
              <XAxis type="number" stroke={theme === 'dark' ? '#ddd' : '#666'} />
              <YAxis dataKey={xDataKey} type="category" stroke={theme === 'dark' ? '#ddd' : '#666'} />
            </>
          ) : (
            <>
              <XAxis dataKey={xDataKey} stroke={theme === 'dark' ? '#ddd' : '#666'} />
              <YAxis stroke={theme === 'dark' ? '#ddd' : '#666'} />
            </>
          )}
          
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend />}
          
          <Bar 
            dataKey={dataKey} 
            radius={barRadius}
            animationDuration={1500}
            animationEasing="ease-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={chartColors[index % chartColors.length]} 
                style={{
                  filter: activeIndex === index ? 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3))' : 'none',
                  cursor: 'pointer',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                  transition: 'opacity 0.3s, filter 0.3s'
                }}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default BarChart;
