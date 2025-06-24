import { useState } from "react";
import { BarChart, LineChart, PieChart, AreaChart, ScatterChart, Radar, Layers, LayoutGrid } from "lucide-react";
import { 
  BarChartTemplate, 
  LineChartTemplate, 
  PieChartTemplate, 
  AreaChartTemplate, 
  ScatterChartTemplate, 
  RadarChartTemplate, 
  ComposedChartTemplate, 
  TreemapTemplate 
} from "@/packages";

/**
 * 模板库部分组件
 * @param {Object} props - 组件属性
 * @param {Function} props.onSelectTemplate - 选择模板的回调函数
 */
const TemplateLibrarySection = ({ onSelectTemplate }) => {
  // 图表模板数据
  const chartTemplates = [
    {
      id: "bar",
      title: "柱状图模板",
      icon: <BarChart className="h-6 w-6 text-blue-500" />,
      description: "用于比较不同类别之间的数值大小",
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
      )
    },
    {
      id: "line",
      title: "折线图模板",
      icon: <LineChart className="h-6 w-6 text-green-500" />,
      description: "展示数据随时间变化的趋势",
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
      )
    },
    {
      id: "pie",
      title: "饼图模板",
      icon: <PieChart className="h-6 w-6 text-red-500" />,
      description: "显示部分与整体的关系",
      component: (
        <PieChartTemplate 
          data={[
            { name: '苹果', value: 400 },
            { name: '香蕉', value: 300 },
            { name: '橙子', value: 300 },
            { name: '葡萄', value: 200 },
          ]}
        />
      )
    },
    {
      id: "area",
      title: "面积图模板",
      icon: <AreaChart className="h-6 w-6 text-purple-500" />,
      description: "强调数量随时间的变化量",
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
      )
    },
    {
      id: "scatter",
      title: "散点图模板",
      icon: <ScatterChart className="h-6 w-6 text-yellow-500" />,
      description: "展示两个变量之间的关系",
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
      )
    },
    {
      id: "radar",
      title: "雷达图模板",
      icon: <Radar className="h-6 w-6 text-indigo-500" />,
      description: "比较多个变量的数值",
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
      )
    },
    {
      id: "composed",
      title: "复合图表模板",
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      description: "在同一图表中组合多种图表类型",
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
      )
    },
    {
      id: "treemap",
      title: "矩形树图模板",
      icon: <LayoutGrid className="h-6 w-6 text-teal-500" />,
      description: "展示层次结构数据的比例关系",
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
      )
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">图表模板库</h2>
        <p className="text-lg text-center text-gray-600 mb-12">丰富的图表模板，满足各种数据可视化需求</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chartTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="flex items-center mb-3">
                {template.icon}
                <h3 className="text-lg font-semibold ml-2">{template.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <div className="h-40 bg-white rounded-lg p-2 border border-gray-200">
                {template.component}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            查看全部模板
          </button>
        </div>
      </div>
    </section>
  );
};

export default TemplateLibrarySection;
