/**
 * 面积图组件
 * @param {Array} data - 图表数据
 * @param {string} xDataKey - X轴数据键名
 * @param {Array} areas - 面积配置数组，包含dataKey、color和name
 * @param {boolean} showGrid - 是否显示网格
 * @param {boolean} showLegend - 是否显示图例
 * @param {number} height - 图表高度
 * @param {boolean} animate - 是否启用动画
 * @param {boolean} tooltip - 是否显示提示框
 * @param {boolean} smooth - 是否使用平滑曲线
 * @param {number} strokeWidth - 线条宽度
 * @param {boolean} stacked - 是否堆叠显示
 * @param {boolean} percentage - 是否显示为百分比
 * @param {boolean} gradientColors - 是否使用渐变色
 * @param {boolean} showPercentage - 是否显示百分比
 * @param {string} specialType - 特殊图表类型
 * @param {string} className - 自定义CSS类名
 */

import React, { useState, useEffect } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import ChartTooltip from './ChartTooltip';

const AreaChart = ({
  data = [
    { age: 0, social: 100, study: 0, game: 0, coding: 0, music: 0 },
    { age: 5, social: 70, study: 30, game: 0, coding: 0, music: 0 },
    { age: 10, social: 40, study: 35, game: 15, coding: 5, music: 5 },
    { age: 15, social: 30, study: 30, game: 20, coding: 10, music: 10 },
    { age: 20, social: 25, study: 25, game: 15, coding: 25, music: 10 },
    { age: 25, social: 20, study: 20, game: 10, coding: 35, music: 15 },
  ],
  xDataKey = 'age',
  areas = [
    { dataKey: 'social', color: '#a7f3d1', name: 'Social' },
    { dataKey: 'study', color: '#99f6e4', name: 'Study' },
    { dataKey: 'game', color: '#a4f2fb', name: 'Game' },
    { dataKey: 'coding', color: '#bbe6fd', name: 'Coding' },
    { dataKey: 'music', color: '#bfdbff', name: 'Music' },
  ],
  showGrid = false,
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
  className = '',
  ...props
}) => {
  // 图表数据状态
  const [chartData, setChartData] = useState(data);

  // 动画处理
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setChartData(data);
      }, 50);
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
      {...props}
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

