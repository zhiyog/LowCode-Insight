import React, { useState, useEffect } from 'react';
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ChartTooltip from './ChartTooltip';

const ScatterChart = ({ 
  data = [], 
  xDataKey = "x", 
  yDataKey = "y",
  zDataKey = "z",
  scatters = [{ dataKey: "data", color: "#8884d8", name: "数据" }],
  showGrid = true,
  showLegend = true,
  height = 300,
  animate = true,
  tooltip = true,
  bubbleSize = false,
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
        <RechartsScatterChart
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#555' : '#ccc'} />}
          <XAxis 
            dataKey={xDataKey} 
            type="number" 
            name="x" 
            stroke={theme === 'dark' ? '#ddd' : '#666'} 
          />
          <YAxis 
            dataKey={yDataKey} 
            type="number" 
            name="y" 
            stroke={theme === 'dark' ? '#ddd' : '#666'} 
          />
          <ZAxis 
            dataKey={zDataKey} 
            range={bubbleSize ? [60, 400] : [60, 60]} 
            name="z" 
          />
          {tooltip && <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: '3 3' }} />}
          {showLegend && <Legend />}
          
          {scatters.map((scatter, index) => (
            <Scatter 
              key={index}
              name={scatter.name || scatter.dataKey}
              data={chartData}
              fill={scatter.color}
              animationDuration={1500}
              animationEasing="ease-out"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              shape={(props) => {
                const { cx, cy, r, fill, index: pointIndex } = props;
                const isActive = activeIndex === pointIndex;
                
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? r * 1.5 : r}
                    fill={fill}
                    stroke={theme === 'dark' ? '#fff' : '#333'}
                    strokeWidth={isActive ? 2 : 1}
                    style={{
                      transition: 'r 0.3s, stroke-width 0.3s',
                      cursor: 'pointer',
                      filter: isActive ? 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5))' : 'none'
                    }}
                  />
                );
              }}
            />
          ))}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ScatterChart;
