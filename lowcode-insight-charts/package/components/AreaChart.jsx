import React, { useState, useEffect } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import ChartTooltip from './ChartTooltip';

const AreaChart = ({
  data = [
    { age: 0, social: 80, study: 0, game: 0, coding: 0, music: 0 },
    { age: 5, social: 60, study: 30, game: 0, coding: 0, music: 0 },
    { age: 10, social: 40, study: 35, game: 15, coding: 5, music: 5 },
    { age: 15, social: 30, study: 30, game: 20, coding: 10, music: 10 },
    { age: 20, social: 25, study: 25, game: 15, coding: 25, music: 10 },
    { age: 25, social: 20, study: 20, game: 10, coding: 35, music: 15 },
  ],
  xDataKey = 'age',
  areas = [{ dataKey: 'social', color: '#8884d8', name: 'Social' }],
  showGrid = true,
  showLegend = true,
  height = 300,
  animate = true,
  tooltip = true,
  smooth = true,
  strokeWidth = 2,
  stacked = false,
  percentage = false,
  gradientColors = false,
  showPercentage = false,
  specialType = '',
  className = '',
}) => {
  const [chartData, setChartData] = useState(data);

  // Managing animation logic
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setChartData(data);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setChartData(data);
    }
  }, [data, animate]);

  const renderTimeAllocation = () => {
    let total = chartData.reduce((acc, item) => acc + item.social, 0); 
    let accumulated = 0;
    const processedData = chartData.map((item) => {
      const startValue = accumulated;
      accumulated += item.social;
      return {
        ...item,
        startValue,
        endValue: accumulated,
        percentage: ((item.social / total) * 100).toFixed(1),
      };
    });

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${className}`}
      >
        <div className="w-full" style={{ height }}>
          <div className="relative w-full h-full">
            {processedData.map((item, index) => {
              const widthPercentage = (item.social / 24) * 100;
              const color = areas[0]?.color || '#8884d8';
              const adjustedColor = index % 2 === 0 ? color : `${color}dd`;
              return (
                <motion.div
                  key={index}
                  className="absolute top-0 h-full flex flex-col justify-between p-2 overflow-hidden"
                  style={{
                    left: `${(item.startValue / 24) * 100}%`,
                    width: `${widthPercentage}%`,
                    backgroundColor: adjustedColor,
                    borderRadius: '8px',
                    margin: '0 1px',
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '100%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="font-medium text-white truncate">{item.name}</div>
                  <div className="text-white text-sm">
                    {item.social}小时
                    {showPercentage && <span className="ml-1">({item.percentage}%)</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  return specialType === 'timeAllocation' ? (
    renderTimeAllocation()
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />}
          <XAxis dataKey={xDataKey} stroke="#666" />
          <YAxis stroke="#666" />
          {tooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend />}
          {areas.map((area, index) => (
            <Area
              key={index}
              type={smooth ? 'monotone' : 'linear'}
              dataKey={area.dataKey}
              name={area.name || area.dataKey}
              stroke={area.color}
              fill={area.color}
              strokeWidth={strokeWidth}
              fillOpacity={gradientColors ? 0.8 : 0.3}
              stackId={stacked || percentage ? '1' : undefined}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {gradientColors && (
                <defs>
                  <linearGradient id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={area.color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              )}
            </Area>
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AreaChart;
