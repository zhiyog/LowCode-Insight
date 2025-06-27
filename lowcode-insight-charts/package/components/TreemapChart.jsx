import React, { useState, useEffect } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const TreemapChart = ({ 
  data = [], 
  dataKey = "value", 
  nameKey = "name",
  colors = [], 
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

  // 自定义内容渲染
  const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, index, name, value } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: chartColors[index % chartColors.length],
            stroke: theme === 'dark' ? '#333' : '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {width > 50 && height > 30 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 7}
              textAnchor="middle"
              fill={theme === 'dark' ? '#fff' : '#000'}
              fontSize={14}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill={theme === 'dark' ? '#fff' : '#000'}
              fontSize={12}
            >
              {value}
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <Treemap
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          aspectRatio={4/3}
          stroke={theme === 'dark' ? '#333' : '#fff'}
          fill="#8884d8"
          content={<CustomizedContent />}
          animationDuration={1500}
          animationEasing="ease-out"
        >
          {tooltip && <Tooltip content={<ChartTooltip />} />}
        </Treemap>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TreemapChart;
