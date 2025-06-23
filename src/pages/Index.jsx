import { BarChart, LineChart, Download, Save, Upload, Code, LayoutGrid, Layers, Activity, Radar, AreaChart, ScatterChart } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import FeatureCard from "@/components/home/FeatureCard";
import HeroSection from "@/components/home/HeroSection";
import ChartPreview from "@/components/ChartPreview";
import AIInputSection from "@/components/AIInputSection";
import useChartGenerator from "@/hooks/useChartGenerator";

const Index = () => {
  const { generatedChart, isGenerating, generateChart } = useChartGenerator();

  const handleGenerateChart = (prompt) => {
    generateChart(prompt);
  };

  const features = [
    {
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
      title: "AI语言生成图表",
    },
    {
      icon: <LineChart className="h-10 w-10 text-green-500" />,
      title: "精美可视化图表",
    },
    {
      icon: <Upload className="h-10 w-10 text-purple-500" />,
      title: "多种数据源连接",
    },
    {
      icon: <Download className="h-10 w-10 text-orange-500" />,
      title: "支持图表导出与嵌入",
    },
    {
      icon: <Save className="h-10 w-10 text-red-500" />,
      title: "组件封装与复用",
    },
    {
      icon: <Code className="h-10 w-10 text-indigo-500" />,
      title: "开发者友好，支持二次开发",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <HeroSection onGenerateChart={handleGenerateChart} />
        
        {/* 功能特点部分 */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">强大功能，简单操作</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  style={{ maxWidth: '320px' }} // 设置最大宽度
                />
              ))}
            </div>

          </div>
        </section>
        
        {/* AI输入演示部分 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">体验AI图表生成</h2>
            <p className="text-lg text-center text-gray-600 mb-12">输入自然语言描述，立即获得专业数据可视化</p>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <AIInputSection onGenerateChart={handleGenerateChart} isLoading={isGenerating} />
                <ChartPreview chartData={generatedChart} />
              </div>
            </div>
          </div>
        </section>
                
        {/* API开放平台部分 */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">开放平台API</h2>
            <p className="text-lg text-center text-gray-600 mb-12">通过NPM包导入，轻松集成到您的项目中</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">开发者集成</h3>
                <p className="text-gray-600 mb-6">使用我们的NPM包，几行代码即可在您的应用中添加强大的图表生成功能</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                  npm install lowcode-insight-charts
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  import {'{'} AIChart {'}'} from 'lowcode-insight-charts';<br/>
                  <br/>
                  &lt;AIChart prompt="展示2023年季度销售数据" /&gt;
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">API功能</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">自然语言处理</span>
                      <p className="text-sm text-gray-600">将文本描述转换为图表配置</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">数据处理</span>
                      <p className="text-sm text-gray-600">自动清洗和转换各种格式的数据</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">图表生成</span>
                      <p className="text-sm text-gray-600">支持10+种图表类型，自动选择最佳可视化方式</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">主题定制</span>
                      <p className="text-sm text-gray-600">支持自定义颜色、字体和布局</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
