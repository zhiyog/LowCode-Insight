import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '../context/ThemeContext';

const GaugeChart = ({ 
  value = 0, 
  min = 0, 
  max = 100,
  colors = [], 
  height = 300,
  animate = true,
  showValue = true,
  unit = "%",
  title = "仪表盘",
  simpleMode = false,
  className = ""
}) => {
  const { theme } = useTheme();
  const [chartValue, setChartValue] = useState(0);
  
  // 默认颜色
  const defaultColors = theme === 'dark' 
    ? ['#ff8042', '#ffc658', '#82ca9d'] 
    : ['#ff8042', '#ffc658', '#82ca9d'];
  
  const chartColors = colors.length > 0 ? colors : defaultColors;
  
  // 计算百分比值
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  // 创建仪表盘数据
  const createGaugeData = () => {
    const gaugeValue = percentage / 100;
    return [
      { name: 'value', value: gaugeValue },
      { name: 'empty', value: 1 - gaugeValue }
    ];
  };
  
  useEffect(() => {
    if (animate) {
      setChartValue(0);
      const timer = setTimeout(() => {
        setChartValue(normalizedValue);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setChartValue(normalizedValue);
    }
  }, [normalizedValue, animate]);

  // 获取颜色
  const getColor = (percent) => {
    if (chartColors.length === 1) return chartColors[0];
    
    if (percent <= 30) return chartColors[0];
    if (percent <= 70) return chartColors[1];
    return chartColors[2];
  };

  // 简单模式
  if (simpleMode) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full relative ${className}`}
      >
        <div className="text-center mb-4 font-medium text-lg">{title}</div>
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {min}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {max}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div 
              style={{ width: `${percentage}%`, backgroundColor: getColor(percentage) }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="text-center text-3xl font-bold">
            {animate ? (
              <CountUp 
                start={0} 
                end={chartValue} 
                duration={1.5} 
                decimals={value % 1 !== 0 ? 1 : 0}
              />
            ) : (
              chartValue
            )}
            <span className="text-xl ml-1">{unit}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full relative ${className}`}
    >
      <div className="text-center mb-2 font-medium text-lg">{title}</div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={createGaugeData()}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            animationDuration={1500}
            animationEasing="ease-out"
            cornerRadius={5}
          >
            <Cell 
              key="gauge-fill" 
              fill={getColor(percentage)} 
              style={{
                filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))'
              }}
            />
            <Cell 
              key="gauge-empty" 
              fill={theme === 'dark' ? '#444' : '#eee'} 
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {showValue && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
          <div className="text-3xl font-bold">
            {animate ? (
              <CountUp 
                start={0} 
                end={chartValue} 
                duration={1.5} 
                decimals={value % 1 !== 0 ? 1 : 0}
              />
            ) : (
              chartValue
            )}
            <span className="text-xl ml-1">{unit}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GaugeChart;
