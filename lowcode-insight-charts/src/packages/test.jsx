import React, { useEffect } from 'react';
import { Card } from '@magic-ui/core'; // Magic UI 提供的卡片组件
import * as echarts from 'echarts';

const BarChart = () => {
  useEffect(() => {
    // 初始化 ECharts 实例
    const chart = echarts.init(document.getElementById('barChart'));

    // 配置图表选项
    const option = {
      title: {
        text: '直方图示例',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        axisLabel: {
          color: '#666',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#666',
        },
      },
      series: [
        {
          name: '数据',
          type: 'bar',
          data: [12, 34, 23, 45, 66, 12, 90],
          itemStyle: {
            color: '#3D89FF', // 设置条形图颜色
          },
        },
      ],
    };

    // 设置图表的配置项
    chart.setOption(option);

    // 清理 ECharts 实例
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <Card title="直方图" bordered>
      <div id="barChart" style={{ height: 400 }}></div>
    </Card>
  );
};

export default BarChart;
