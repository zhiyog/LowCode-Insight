import React, { useState, useEffect } from 'react';
import { FunnelChart as RechartsFunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const FunnelChart = ({ 
  data = [], 
  dataKey = "value", 
  nameKey = "name",
  colors = [], 
  height = 300,
  animate = true,
  tooltip = true,
  showLabel = true,
  isAnimationActive = true,
  isSymmetric = false,
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
        <RechartsFunnelChart>
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          <Funnel
            data={chartData}
            dataKey={dataKey}
            nameKey={nameKey}
            isAnimationActive={isAnimationActive}
            animationDuration={1500}
            animationEasing="ease-out"
            isSymmetric={isSymmetric}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showLabel && (
              <LabelList 
                position="right" 
                fill={theme === 'dark' ? '#fff' : '#000'} 
                stroke="none" 
                dataKey={nameKey} 
              />
            )}
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={chartColors[index % chartColors.length]} 
                stroke={theme === 'dark' ? '#333' : '#fff'}
                strokeWidth={activeIndex === index ? 2 : 1}
                style={{
                  filter: activeIndex === index ? 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3))' : 'none',
                  cursor: 'pointer',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                  transition: 'opacity 0.3s, filter 0.3s'
                }}
              />
            ))}
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default FunnelChart;
