import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import CountUp from 'react-countup';

const ProgressChart = ({ 
  data = [], 
  height = 300,
  animate = true,
  circleMode = false,
  colors = [],
  className = ""
}) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState([]);
  
  // 默认颜色
  const defaultColors = theme === 'dark' 
    ? ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'] 
    : ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
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

  // 线性进度条
  const LinearProgress = ({ item, index }) => {
    const percentage = (item.current / item.total) * 100;
    const color = chartColors[index % chartColors.length];
    
    return (
      <div className="mb-4 last:mb-0">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm">{item.name}</span>
          <span className="text-sm">
            {animate ? (
              <CountUp 
                start={0} 
                end={percentage} 
                duration={1.5} 
                decimals={1}
                suffix="%"
              />
            ) : (
              `${percentage.toFixed(1)}%`
            )}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className="h-2.5 rounded-full" 
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  };

  // 圆形进度条
  const CircleProgress = ({ item, index }) => {
    const percentage = (item.current / item.total) * 100;
    const color = chartColors[index % chartColors.length];
    
    // 创建圆形进度数据
    const createCircleData = () => {
      return [
        { name: 'progress', value: percentage },
        { name: 'remaining', value: 100 - percentage }
      ];
    };
    
    return (
      <div className="mb-4 last:mb-0 flex items-center">
        <div className="w-16 h-16 mr-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={createCircleData()}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={0}
                dataKey="value"
                animationDuration={1500}
                animationEasing="ease-out"
                cornerRadius={percentage < 100 ? 5 : 0}
              >
                <Cell key="progress" fill={color} />
                <Cell key="remaining" fill={theme === 'dark' ? '#444' : '#eee'} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="font-medium">{item.name}</span>
            <span>
              {animate ? (
                <CountUp 
                  start={0} 
                  end={percentage} 
                  duration={1.5} 
                  decimals={1}
                  suffix="%"
                />
              ) : (
                `${percentage.toFixed(1)}%`
              )}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="h-2 rounded-full" 
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
      style={{ height }}
    >
      <div className="h-full overflow-auto py-2">
        {chartData.map((item, index) => (
          <React.Fragment key={index}>
            {circleMode ? (
              <CircleProgress item={item} index={index} />
            ) : (
              <LinearProgress item={item} index={index} />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressChart;
