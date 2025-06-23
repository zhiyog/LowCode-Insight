import { useState } from "react";
import { Menu, X, ChevronRight, Search, BarChart2, PieChart, LineChart, AreaChart, ScatterChart, Radar, Layers, LayoutGrid } from "lucide-react";
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
import ChartTemplateDetail from "@/components/ChartTemplateDetail";
import Header from "@/components/home/Header";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("基础图表");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // 图表分类
  const categories = [
    {
      name: "基础图表",
      items: [
        { 
          id: "bar",
          name: "柱状图", 
          description: "用于比较不同类别之间的数值大小",
          icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
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
          name: "折线图", 
          description: "展示数据随时间变化的趋势",
          icon: <LineChart className="h-5 w-5 text-green-500" />,
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
          name: "饼图", 
          description: "显示部分与整体的关系",
          icon: <PieChart className="h-5 w-5 text-red-500" />,
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
          name: "面积图", 
          description: "强调数量随时间的变化量",
          icon: <AreaChart className="h-5 w-5 text-purple-500" />,
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
        }
      ]
    },
    {
      name: "高级图表",
      items: [
        { 
          id: "scatter",
          name: "散点图", 
          description: "展示两个变量之间的关系",
          icon: <ScatterChart className="h-5 w-5 text-yellow-500" />,
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
          name: "雷达图", 
          description: "比较多个变量的数值",
          icon: <Radar className="h-5 w-5 text-indigo-500" />,
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
          name: "复合图表", 
          description: "在同一图表中组合多种图表类型",
          icon: <Layers className="h-5 w-5 text-orange-500" />,
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
          name: "矩形树图", 
          description: "展示层次结构数据的比例关系",
          icon: <LayoutGrid className="h-5 w-5 text-teal-500" />,
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
        }
      ]
    },
    {
      name: "图表模板",
      items: [
        { name: "销售数据分析", description: "销售数据可视化模板" },
        { name: "用户增长分析", description: "用户增长趋势分析模板" },
        { name: "财务报表", description: "财务数据可视化模板" },
        { name: "项目管理", description: "项目进度和资源分配模板" }
      ]
    },
    {
      name: "开发指南",
      items: [
        { name: "快速开始", description: "图表库使用入门指南" },
        { name: "API文档", description: "详细的API参考文档" },
        { name: "自定义主题", description: "图表样式和主题定制指南" },
        { name: "数据处理", description: "数据格式化和处理指南" }
      ]
    }
  ];

  // 获取当前分类的图表项
  const currentCategoryItems = categories.find(cat => cat.name === activeCategory)?.items || [];
  
  // 搜索过滤
  const filteredItems = searchQuery 
    ? currentCategoryItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategoryItems;

  return (
    <div>
      <div>
        <Header /> 
      </div>
      <div className="flex h-screen bg-gray-50">
        {/* 移动端侧边栏开关 */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-white shadow-md text-gray-600"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 侧边栏 */}
        <div
          className={`fixed md:relative z-40 w-64 bg-white shadow-md transition-all duration-300 h-full overflow-auto ${
            sidebarOpen ? "left-0" : "-left-64"
          }`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">图表库</h1>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="搜索图表..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="py-4">
            {categories.map((category) => (
              <div key={category.name} className="mb-4">
                <button
                  onClick={() => {
                    setActiveCategory(category.name);
                    setSearchQuery("");
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-left font-medium ${
                    activeCategory === category.name ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  <span>{category.name}</span>
                  <ChevronRight
                    size={16}
                    className={`transform transition-transform ${
                      activeCategory === category.name ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {activeCategory === category.name && (
                  <div className="mt-1 pl-4">
                    {category.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          if (item.component) {
                            setSelectedTemplate(item);
                          }
                          if (window.innerWidth < 768) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={`flex items-center w-full text-left px-4 py-2 text-sm rounded-md my-1 ${
                          selectedTemplate?.name === item.name
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeCategory}</h2>
              <p className="text-gray-600">
                {activeCategory === "基础图表" && "基础图表类型，适用于常见的数据可视化需求"}
                {activeCategory === "高级图表" && "高级图表类型，适用于复杂的数据分析和展示"}
                {activeCategory === "图表模板" && "预设的图表模板，可直接应用于业务场景"}
                {activeCategory === "开发指南" && "图表库的使用指南和开发文档"}
              </p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=empty,search&width=200&height=200&source=meituan" 
                  alt="没有找到结果" 
                  className="mx-auto object-cover h-40 w-40 mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-2">没有找到匹配的图表</h3>
                <p className="text-gray-600">尝试使用不同的关键词或浏览其他分类</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      if (item.component) {
                        setSelectedTemplate(item);
                      }
                    }}
                    className={`bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 ${
                      !item.component ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      {item.icon && item.icon}
                      {!item.icon && (
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <h3 className="text-lg font-semibold ml-2">{item.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    {item.component ? (
                      <div className="h-40 bg-gray-50 rounded-lg p-2 border border-gray-200 overflow-hidden">
                        {item.component}
                      </div>
                    ) : (
                      <div className="h-40 bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">即将推出</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 图表详情弹窗 */}
        {selectedTemplate && (
          <ChartTemplateDetail 
            template={selectedTemplate} 
            onClose={() => setSelectedTemplate(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;