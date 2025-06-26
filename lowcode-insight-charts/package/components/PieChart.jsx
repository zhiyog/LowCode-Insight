import React, { useState, useEffect } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChart = ({ 
  data = [], 
  dataKey = "value", 
  nameKey = "name",
  colors = [], 
  showLegend = true,
  innerRadius = 0,
  outerRadius = "80%",
  paddingAngle = 0,
  startAngle = 0,
  endAngle = 360,
  height = 300,
  animate = true,
  tooltip = true,
  showLabel = true,
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

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
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
        <RechartsPieChart>
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend />}
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showLabel ? renderCustomizedLabel : null}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            paddingAngle={paddingAngle}
            dataKey={dataKey}
            nameKey={nameKey}
            startAngle={startAngle}
            endAngle={endAngle}
            animationDuration={1500}
            animationEasing="ease-out"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={chartColors[index % chartColors.length]} 
                stroke={theme === 'dark' ? '#333' : '#fff'}
                strokeWidth={activeIndex === index ? 2 : 1}
                style={{
                  filter: activeIndex === index ? 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.5))' : 'none',
                  cursor: 'pointer',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                  transition: 'opacity 0.3s, filter 0.3s'
                }}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PieChart;
