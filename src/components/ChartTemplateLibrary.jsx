import { useState } from "react";
import { Search, Filter, BarChart, LineChart, PieChart, AreaChart, ScatterChart, Radar, Layers, LayoutGrid } from "lucide-react";
import { 
  BarChartTemplate, 
  LineChartTemplate, 
  PieChartTemplate, 
  AreaChartTemplate, 
  ScatterChartTemplate, 
  RadarChartTemplate, 
  ComposedChartTemplate, 
  TreemapTemplate 
} from "@/components/charts";
import ChartTemplateDetail from "./ChartTemplateDetail";

/**
 * 图表模板库组件
 */
const ChartTemplateLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // 图表模板数据
  const chartTemplates = [
    {
      id: "bar",
      title: "柱状图模板",
      icon: <BarChart className="h-6 w-6 text-blue-500" />,
      description: "用于比较不同类别之间的数值大小",
      category: "basic",
      component: (
        <BarChartTemplate 
          data={[
            { name: '一月', value: 400 },
            { name: '二月', value: 300 },
            { name: '三月', value: 500 },
            { name: '四月', value: 280 },
            { name: '五月', value: 590 },
          ]}
        />
      ),
      sampleData: [
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 500 },
      ],
      codeProps: 'xDataKey="name"'
    },
    {
      id: "line",
      title: "折线图模板",
      icon: <LineChart className="h-6 w-6 text-green-500" />,
      description: "展示数据随时间变化的趋势",
      category: "basic",
      component: (
        <LineChartTemplate 
          data={[
            { name: '一月', value: 400 },
            { name: '二月', value: 300 },
            { name: '三月', value: 500 },
            { name: '四月', value: 280 },
            { name: '五月', value: 590 },
          ]}
        />
      ),
      sampleData: [
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 500 },
      ],
      codeProps: 'xDataKey="name"'
    },
    {
      id: "pie",
      title: "饼图模板",
      icon: <PieChart className="h-6 w-6 text-red-500" />,
      description: "显示部分与整体的关系",
      category: "basic",
      component: (
        <PieChartTemplate 
          data={[
            { name: '苹果', value: 400 },
            { name: '香蕉', value: 300 },
            { name: '橙子', value: 300 },
            { name: '葡萄', value: 200 },
          ]}
        />
      ),
      sampleData: [
        { name: '苹果', value: 400 },
        { name: '香蕉', value: 300 },
        { name: '橙子', value: 300 },
      ],
      codeProps: 'nameKey="name"\ndataKey="value"'
    },
    {
      id: "area",
      title: "面积图模板",
      icon: <AreaChart className="h-6 w-6 text-purple-500" />,
      description: "强调数量随时间的变化量",
      category: "basic",
      component: (
        <AreaChartTemplate 
          data={[
            { name: '一月', value: 400 },
            { name: '二月', value: 300 },
            { name: '三月', value: 500 },
            { name: '四月', value: 280 },
            { name: '五月', value: 590 },
          ]}
        />
      ),
      sampleData: [
        { name: '一月', value: 400 },
        { name: '二月', value: 300 },
        { name: '三月', value: 500 },
      ],
      codeProps: 'xDataKey="name"\nareas={[{ dataKey: "value", color: "#3b82f6" }]}'
    },
    {
      id: "scatter",
      title: "散点图模板",
      icon: <ScatterChart className="h-6 w-6 text-yellow-500" />,
      description: "展示两个变量之间的关系",
      category: "advanced",
      component: (
        <ScatterChartTemplate 
          data={[
            { x: 100, y: 200, z: 200 },
            { x: 120, y: 100, z: 260 },
            { x: 170, y: 300, z: 400 },
            { x: 140, y: 250, z: 280 },
            { x: 150, y: 400, z: 500 },
            { x: 110, y: 280, z: 200 },
          ]}
        />
      ),
      sampleData: [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
      ],
      codeProps: 'xDataKey="x"\nyDataKey="y"\nzDataKey="z"'
    },
    {
      id: "radar",
      title: "雷达图模板",
      icon: <Radar className="h-6 w-6 text-indigo-500" />,
      description: "比较多个变量的数值",
      category: "advanced",
      component: (
        <RadarChartTemplate 
          data={[
            { subject: '数学', A: 120, B: 110, fullMark: 150 },
            { subject: '语文', A: 98, B: 130, fullMark: 150 },
            { subject: '英语', A: 86, B: 130, fullMark: 150 },
            { subject: '物理', A: 99, B: 100, fullMark: 150 },
            { subject: '化学', A: 85, B: 90, fullMark: 150 },
          ]}
          radars={[
            { dataKey: 'A', name: '学生A', color: '#8884d8' },
            { dataKey: 'B', name: '学生B', color: '#82ca9d' },
          ]}
        />
      ),
      sampleData: [
        { subject: '数学', A: 120, B: 110 },
        { subject: '语文', A: 98, B: 130 },
        { subject: '英语', A: 86, B: 130 },
      ],
      codeProps: 'angleKey="subject"\nradars={[{ dataKey: "A", name: "学生A" }, { dataKey: "B", name: "学生B" }]}'
    },
    {
      id: "composed",
      title: "复合图表模板",
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      description: "在同一图表中组合多种图表类型",
      category: "advanced",
      component: (
        <ComposedChartTemplate 
          data={[
            { name: '一月', 收入: 800, 支出: 400, 利润: 400 },
            { name: '二月', 收入: 700, 支出: 500, 利润: 200 },
            { name: '三月', 收入: 900, 支出: 600, 利润: 300 },
            { name: '四月', 收入: 1000, 支出: 700, 利润: 300 },
            { name: '五月', 收入: 1200, 支出: 800, 利润: 400 },
          ]}
          bars={[
            { dataKey: '收入', color: '#8884d8' },
            { dataKey: '支出', color: '#82ca9d' },
          ]}
          lines={[
            { dataKey: '利润', color: '#ff7300' },
          ]}
        />
      ),
      sampleData: [
        { name: '一月', 收入: 800, 支出: 400, 利润: 400 },
        { name: '二月', 收入: 700, 支出: 500, 利润: 200 },
      ],
      codeProps: 'bars={[{ dataKey: "收入" }, { dataKey: "支出" }]}\nlines={[{ dataKey: "利润" }]}'
    },
    {
      id: "treemap",
      title: "矩形树图模板",
      icon: <LayoutGrid className="h-6 w-6 text-teal-500" />,
      description: "展示层次结构数据的比例关系",
      category: "advanced",
      component: (
        <TreemapTemplate 
          data={[
            {
              name: '电子产品',
              children: [
                { name: '手机', value: 5000 },
                { name: '电脑', value: 3000 },
                { name: '平板', value: 2000 },
              ],
            },
            {
              name: '服装',
              children: [
                { name: '上衣', value: 2000 },
                { name: '裤子', value: 1800 },
                { name: '鞋子', value: 2200 },
              ],
            },
          ]}
        />
      ),
      sampleData: [
        {
          name: '电子产品',
          children: [
            { name: '手机', value: 5000 },
            { name: '电脑', value: 3000 },
          ],
        },
      ],
      codeProps: 'dataKey="value"'
    },
  ];
  
  // 过滤模板
  const filteredTemplates = chartTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // 分类选项
  const categories = [
    { id: "all", name: "全部" },
    { id: "basic", name: "基础图表" },
    { id: "advanced", name: "高级图表" },
  ];
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">图表模板库</h2>
        <p className="text-lg text-center text-gray-600 mb-12">丰富的图表模板，满足各种数据可视化需求</p>
        
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索模板..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">分类:</span>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedCategory === category.id
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-center mb-3">
                {template.icon}
                <h3 className="text-lg font-semibold ml-2">{template.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <div className="h-40 bg-gray-50 rounded-lg p-2 border border-gray-200">
                {template.component}
              </div>
            </div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">没有找到匹配的模板</p>
          </div>
        )}
      </div>
      
      {selectedTemplate && (
        <ChartTemplateDetail 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplate(null)} 
        />
      )}
    </div>
  );
};

export default ChartTemplateLibrary;
