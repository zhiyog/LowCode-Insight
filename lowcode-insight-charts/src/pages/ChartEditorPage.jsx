import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChartEditor from '../components/ChartEditor';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  AreaChart, 
  RadarChart, 
  ScatterChart,
  GaugeChart,
  ThemeProvider
} from '../../package/index';

const ChartEditorPage = () => {
  const { chartType } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');


  // 获取图表组件
  const getChartComponent = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart />;
      case 'pie':
        return <PieChart />;
      case 'line':
        return <LineChart />;
      case 'area':
        return <AreaChart />;
      case 'radar':
        return <RadarChart />;
      case 'scatter':
        return <ScatterChart />;
      case 'gauge':
        return <GaugeChart />;
      default:
        return null;
    }
  };

  const chartComponent = getChartComponent();
  

  return (
    <ThemeProvider defaultTheme={theme}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* 头部导航 */}
        <div className={`border-b p-4 ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>返回</span>
            </button>
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              图表编辑器
            </h1>
          </div>
        </div>

        {/* 编辑器 */}
        <ChartEditor
          chartComponent={chartComponent}
          defaultProps={defaultProps}
          chartName={chartType.charAt(0).toUpperCase() + chartType.slice(1) + 'Chart'}
          theme={theme}
        />
      </div>
    </ThemeProvider>
  );
};

export default ChartEditorPage;
