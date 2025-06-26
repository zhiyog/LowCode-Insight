import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  AreaChart, 
  RadarChart, 
  ScatterChart,
  GaugeChart,
  ChartCard,
  ThemeProvider
} from '../../package/index';
import { Sun, Moon, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Activity, Radar, ScatterChart as ScatterChartIcon, Settings, Download, Edit, Palette } from 'lucide-react';
import ChartConfigEditor from '../components/ChartConfigEditor';

const Index = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('area');
  const [showConfigEditor, setShowConfigEditor] = useState(false);
  
  // 切换主题
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  // 时间分配数据 - 使用 useMemo 避免重复创建
  const timeAllocationData = useMemo(() => [
    { age: 0, social: 80, study: 0, game: 0, coding: 0, music: 0 },
    { age: 5, social: 60, study: 30, game: 0, coding: 0, music: 0 },
    { age: 10, social: 40, study: 35, game: 15, coding: 5, music: 5 },
    { age: 15, social: 30, study: 30, game: 20, coding: 10, music: 10 },
    { age: 20, social: 25, study: 25, game: 15, coding: 25, music: 10 },
    { age: 25, social: 20, study: 20, game: 10, coding: 35, music: 15 },
  ], []);

  // 饼图数据
  const pieData = useMemo(() => [
    { name: '社交/家庭', value: 20 },
    { name: '学习', value: 20 },
    { name: '游戏', value: 10 },
    { name: '编程', value: 35 },
    { name: '音乐', value: 15 },
  ], []);

  // 柱状图数据
  const barData = useMemo(() => [
    { name: '周一', value: 40 },
    { name: '周二', value: 30 },
    { name: '周三', value: 20 },
    { name: '周四', value: 27 },
    { name: '周五', value: 18 },
    { name: '周六', value: 23 },
    { name: '周日', value: 34 },
  ], []);

  // 折线图数据
  const lineData = useMemo(() => [
    { month: '一月', coding: 30, learning: 20 },
    { month: '二月', coding: 25, learning: 15 },
    { month: '三月', coding: 35, learning: 25 },
    { month: '四月', coding: 40, learning: 30 },
    { month: '五月', coding: 30, learning: 20 },
    { month: '六月', coding: 45, learning: 35 },
  ], []);

  // 雷达图数据
  const radarData = useMemo(() => [
    { subject: '编程', A: 120, B: 110, fullMark: 150 },
    { subject: '设计', A: 98, B: 130, fullMark: 150 },
    { subject: '数学', A: 86, B: 130, fullMark: 150 },
    { subject: '语言', A: 99, B: 100, fullMark: 150 },
    { subject: '物理', A: 85, B: 90, fullMark: 150 },
    { subject: '历史', A: 65, B: 85, fullMark: 150 },
  ], []);

  // 散点图数据
  const scatterData = useMemo(() => [
    { x: 10, y: 30, z: 200 },
    { x: 40, y: 50, z: 400 },
    { x: 30, y: 70, z: 300 },
    { x: 50, y: 20, z: 500 },
    { x: 70, y: 40, z: 450 },
    { x: 80, y: 80, z: 350 },
  ], []);

  // 标签页配置
  const tabs = useMemo(() => [
    { id: 'area', label: '面积图', icon: <Activity className="h-4 w-4" /> },
    { id: 'bar', label: '柱状图', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'pie', label: '饼图', icon: <PieChartIcon className="h-4 w-4" /> },
    { id: 'line', label: '折线图', icon: <LineChartIcon className="h-4 w-4" /> },
    { id: 'radar', label: '雷达图', icon: <Radar className="h-4 w-4" /> },
    { id: 'scatter', label: '散点图', icon: <ScatterChartIcon className="h-4 w-4" /> },
    { id: 'gauge', label: '仪表盘', icon: <Activity className="h-4 w-4" /> },
  ], []);

  // 跳转到编辑器
  const goToEditor = useCallback((chartType) => {
    navigate(`/editor/${chartType}`);
  }, [navigate]);

  // 打开配置编辑器
  const openConfigEditor = useCallback(() => {
    setShowConfigEditor(true);
  }, []);

  // 渲染当前选中的图表
  const renderChart = useCallback(() => {
    const actionButtons = (
      <div className="flex items-center space-x-2">
        <button
          onClick={openConfigEditor}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
            theme === 'dark' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          <Palette className="h-4 w-4" />
          <span>配置与编辑</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
            theme === 'dark' 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          <Download className="h-4 w-4" />
          <span>导出图表</span>
        </button>
      </div>
    );

    switch (activeTab) {
      case 'area':
        return (
          <ChartCard 
            title="我的时间分配趋势" 
            subtitle="不同年龄阶段的时间分配情况"
            icon={actionButtons}
          >
            <div className="h-[350px]">
              <AreaChart
                data={timeAllocationData}
                xDataKey="age"
                areas={[
                  { dataKey: "social", color: "#10B981", name: "社交/家庭" },
                  { dataKey: "study", color: "#60A5FA", name: "学习" },
                  { dataKey: "game", color: "#F59E0B", name: "游戏" },
                  { dataKey: "coding", color: "#6366F1", name: "编程" },
                  { dataKey: "music", color: "#EC4899", name: "音乐" }
                ]}
                stacked={true}
                percentage={true}
                height={300}
                smooth={true}
                gradientColors={true}
                showGrid={false}
                specialType="timeAllocation"
                showPercentage={true}
              />
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {[
                { label: "社交/家庭", color: "#10B981", desc: "与家人朋友相处的时间" },
                { label: "学习", color: "#60A5FA", desc: "课程学习和自我提升" },
                { label: "游戏", color: "#F59E0B", desc: "休闲娱乐时间" },
                { label: "编程", color: "#6366F1", desc: "编程开发相关" },
                { label: "音乐", color: "#EC4899", desc: "音乐创作和欣赏" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="text-xs font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        );
      case 'bar':
        return (
          <ChartCard 
            title="每周工作时间统计" 
            subtitle="一周内每天的工作时间分布"
            icon={actionButtons}
          >
            <div className="h-[300px]">
              <BarChart
                data={barData}
                xDataKey="name"
                dataKey="value"
                colors={["#6366F1", "#8B5CF6", "#EC4899"]}
                height={300}
                barRadius={[8, 8, 0, 0]}
                barSize={30}
                showGrid={false}
              />
            </div>
          </ChartCard>
        );
      case 'pie':
        return (
          <ChartCard 
            title="当前时间分配" 
            subtitle="各项活动所占时间比例"
            icon={actionButtons}
          >
            <div className="h-[300px]">
              <PieChart
                data={pieData}
                dataKey="value"
                nameKey="name"
                colors={["#10B981", "#60A5FA", "#F59E0B", "#6366F1", "#EC4899"]}
                height={300}
                innerRadius={60}
                outerRadius="70%"
                paddingAngle={2}
                showLabel={false}
              />
            </div>
          </ChartCard>
        );
      case 'line':
        return (
          <ChartCard 
            title="编程与学习时间趋势" 
            subtitle="近六个月的时间投入对比"
            icon={actionButtons}
          >
            <div className="h-[300px]">
              <LineChart
                data={lineData}
                xDataKey="month"
                lines={[
                  { dataKey: "coding", color: "#6366F1", name: "编程" },
                  { dataKey: "learning", color: "#60A5FA", name: "学习" }
                ]}
                height={300}
                smooth={true}
                strokeWidth={3}
                showGrid={false}
              />
            </div>
          </ChartCard>
        );
      case 'radar':
        return (
          <ChartCard 
            title="能力评估雷达图" 
            subtitle="各领域能力水平对比"
            icon={actionButtons}
          >
            <div className="h-[300px]">
              <RadarChart
                data={radarData}
                nameKey="subject"
                radars={[
                  { dataKey: "A", color: "#6366F1", name: "自我评估" },
                  { dataKey: "B", color: "#60A5FA", name: "他人评估" }
                ]}
                height={300}
                fillOpacity={0.6}
              />
            </div>
          </ChartCard>
        );
      case 'scatter':
        return (
          <ChartCard 
            title="项目分布散点图" 
            subtitle="项目复杂度与完成时间关系"
            icon={actionButtons}
          >
            <div className="h-[300px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg" />
              <ScatterChart
                data={scatterData}
                xDataKey="x"
                yDataKey="y"
                zDataKey="z"
                scatters={[
                  { dataKey: "data", color: "#6366F1", name: "项目" }
                ]}
                height={300}
                bubbleSize={true}
                showGrid={false}
              />
            </div>
          </ChartCard>
        );
      case 'gauge':
        return (
          <ChartCard 
            title="项目完成度" 
            subtitle="当前项目进度"
            icon={actionButtons}
          >
            <div className="h-[300px]">
              <GaugeChart
                value={75}
                min={0}
                max={100}
                colors={["#6366F1", "#8B5CF6", "#EC4899"]}
                height={300}
                unit="%"
                title="总体完成率"
                simpleMode={false}
              />
            </div>
          </ChartCard>
        );
      default:
        return null;
    }
  }, [activeTab, timeAllocationData, pieData, barData, lineData, radarData, scatterData, theme, goToEditor, openConfigEditor]);

  return (
    <ThemeProvider defaultTheme={theme}>
      <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-all duration-500`}>
        {/* 动态背景装饰 */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className={`absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl transition-all duration-1000 ${theme === 'dark' ? 'animate-pulse' : ''}`} />
          <div className={`absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl transition-all duration-1000 delay-300 ${theme === 'dark' ? 'animate-pulse' : ''}`} />
          <div className={`absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-xl transition-all duration-1000 delay-500 ${theme === 'dark' ? 'animate-pulse' : ''}`} />
        </div>
        
        <div className="max-w-7xl mx-auto p-4 md:p-6 relative z-10">
          {/* 头部 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} flex items-center transition-all duration-300`}>
              <span className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">图表组件库</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>预览</span>
            </h1>
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-500 transform hover:scale-110 z-30 relative ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-yellow-400 hover:from-gray-700 hover:to-gray-600 shadow-lg shadow-yellow-400/20' 
                  : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 hover:from-gray-50 hover:to-gray-100 shadow-lg shadow-blue-400/20'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="h-6 w-6 transition-transform duration-500 rotate-0" />
              ) : (
                <Moon className="h-6 w-6 transition-transform duration-500 rotate-180" />
              )}
            </button>
          </div>
          
          {/* 标签页 */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id 
                      ? `${theme === 'dark' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-400/30'
                        }` 
                      : `${theme === 'dark' 
                          ? 'bg-gray-800/70 text-gray-400 hover:bg-gray-700/80 hover:text-gray-300 backdrop-blur-sm' 
                          : 'bg-white/70 text-gray-500 hover:bg-gray-50/80 hover:text-gray-700 backdrop-blur-sm shadow-sm'
                        }`
                  }`}
                >
                  <span className="transition-transform duration-300">{tab.icon}</span>
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* 图表内容 */}
          <div className={`rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-500 ${
            theme === 'dark' 
              ? 'bg-gray-800/80 border border-gray-700/50 shadow-2xl shadow-indigo-900/20' 
              : 'bg-white/80 border border-gray-100/50 shadow-2xl shadow-indigo-200/30'
          }`}>
            {renderChart()}
          </div>
          
          {/* 底部说明 */}
          <div className={`mt-6 text-center text-sm transition-all duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-medium">
              图表组件库
            </span> - 基于 Recharts 构建，支持多种图表类型和主题切换
          </div>
        </div>

        {/* 配置编辑器模态框 */}
        {showConfigEditor && (
          <ChartConfigEditor
            chartType={activeTab}
            theme={theme}
            onClose={() => setShowConfigEditor(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
