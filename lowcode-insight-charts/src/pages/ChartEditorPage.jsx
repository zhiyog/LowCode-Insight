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

  // 示例数据
  const sampleData = useMemo(() => ({
    bar: [
      { name: '周一', value: 40 },
      { name: '周二', value: 30 },
      { name: '周三', value: 20 },
      { name: '周四', value: 27 },
      { name: '周五', value: 18 },
      { name: '周六', value: 23 },
      { name: '周日', value: 34 },
    ],
    pie: [
      { name: '社交/家庭', value: 20 },
      { name: '学习', value: 20 },
      { name: '游戏', value: 10 },
      { name: '编程', value: 35 },
      { name: '音乐', value: 15 },
    ],
    line: [
      { month: '一月', coding: 30, learning: 20 },
      { month: '二月', coding: 25, learning: 15 },
      { month: '三月', coding: 35, learning: 25 },
      { month: '四月', coding: 40, learning: 30 },
      { month: '五月', coding: 30, learning: 20 },
      { month: '六月', coding: 45, learning: 35 },
    ],
    area: [
      { age: 0, social: 80, study: 0, game: 0, coding: 0, music: 0 },
      { age: 5, social: 60, study: 30, game: 0, coding: 0, music: 0 },
      { age: 10, social: 40, study: 35, game: 15, coding: 5, music: 5 },
      { age: 15, social: 30, study: 30, game: 20, coding: 10, music: 10 },
      { age: 20, social: 25, study: 25, game: 15, coding: 25, music: 10 },
      { age: 25, social: 20, study: 20, game: 10, coding: 35, music: 15 },
    ],
    radar: [
      { subject: '编程', A: 120, B: 110, fullMark: 150 },
      { subject: '设计', A: 98, B: 130, fullMark: 150 },
      { subject: '数学', A: 86, B: 130, fullMark: 150 },
      { subject: '语言', A: 99, B: 100, fullMark: 150 },
      { subject: '物理', A: 85, B: 90, fullMark: 150 },
      { subject: '历史', A: 65, B: 85, fullMark: 150 },
    ],
    scatter: [
      { x: 10, y: 30, z: 200 },
      { x: 40, y: 50, z: 400 },
      { x: 30, y: 70, z: 300 },
      { x: 50, y: 20, z: 500 },
      { x: 70, y: 40, z: 450 },
      { x: 80, y: 80, z: 350 },
    ]
  }), []);

  // 默认属性配置
  const defaultProps = useMemo(() => {
    switch (chartType) {
      case 'bar':
        return {
          data: sampleData.bar,
          xDataKey: "name",
          dataKey: "value",
          colors: ["#6366F1", "#8B5CF6", "#EC4899"],
          showGrid: true,
          showLegend: true,
          isHorizontal: false,
          barSize: 30,
          barGap: 4,
          height: 300,
          animate: true,
          tooltip: true
        };
      case 'pie':
        return {
          data: sampleData.pie,
          dataKey: "value",
          nameKey: "name",
          colors: ["#10B981", "#60A5FA", "#F59E0B", "#6366F1", "#EC4899"],
          showLegend: true,
          innerRadius: 60,
          outerRadius: "70%",
          paddingAngle: 2,
          startAngle: 0,
          endAngle: 360,
          height: 300,
          animate: true,
          tooltip: true,
          showLabel: true
        };
      case 'line':
        return {
          data: sampleData.line,
          xDataKey: "month",
          lines: [
            { dataKey: "coding", color: "#6366F1", name: "编程" },
            { dataKey: "learning", color: "#60A5FA", name: "学习" }
          ],
          showGrid: true,
          showLegend: true,
          height: 300,
          animate: true,
          tooltip: true,
          smooth: true,
          strokeWidth: 2,
          dot: true
        };
      case 'area':
        return {
          data: sampleData.area,
          xDataKey: "age",
          areas: [
            { dataKey: "social", color: "#10B981", name: "社交/家庭" },
            { dataKey: "study", color: "#60A5FA", name: "学习" },
            { dataKey: "game", color: "#F59E0B", name: "游戏" },
            { dataKey: "coding", color: "#6366F1", name: "编程" },
            { dataKey: "music", color: "#EC4899", name: "音乐" }
          ],
          showGrid: true,
          showLegend: true,
          height: 300,
          animate: true,
          tooltip: true,
          smooth: true,
          strokeWidth: 2,
          stacked: true
        };
      case 'radar':
        return {
          data: sampleData.radar,
          nameKey: "subject",
          radars: [
            { dataKey: "A", color: "#6366F1", name: "自我评估" },
            { dataKey: "B", color: "#60A5FA", name: "他人评估" }
          ],
          showLegend: true,
          height: 300,
          animate: true,
          tooltip: true,
          fillOpacity: 0.6,
          strokeWidth: 2
        };
      case 'scatter':
        return {
          data: sampleData.scatter,
          xDataKey: "x",
          yDataKey: "y",
          zDataKey: "z",
          scatters: [
            { dataKey: "data", color: "#6366F1", name: "项目" }
          ],
          showGrid: true,
          showLegend: true,
          height: 300,
          animate: true,
          tooltip: true,
          bubbleSize: true
        };
      case 'gauge':
        return {
          value: 75,
          min: 0,
          max: 100,
          colors: ["#6366F1", "#8B5CF6", "#EC4899"],
          height: 300,
          animate: true,
          showValue: true,
          unit: "%",
          title: "仪表盘",
          simpleMode: false
        };
      default:
        return {};
    }
  }, [chartType, sampleData]);

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
  
  if (!chartComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">图表类型不存在</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

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
