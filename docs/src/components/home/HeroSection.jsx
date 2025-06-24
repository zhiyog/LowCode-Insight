import { useState } from "react";
import { Sparkles } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const HeroSection = ({ onGenerateChart }) => {
  const [prompt, setPrompt] = useState("");
  const generateText = useTranslation("chart.generate");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerateChart(prompt);
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            基于AI的图表生成库
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            通过自然语言和可视化，轻松创建专业数据可视化图表
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="输入：帮我展示最近GitHub活跃趋势..."
              className="w-full py-4 px-6 pr-16 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
            >
              <Sparkles className="h-6 w-6" />
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-500">
            试试输入: "创建网站流量趋势图" 或 "生成市场份额饼图"
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-blue-600 font-bold text-4xl mb-2">10+</div>
            <div className="text-gray-600">图表类型</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-blue-600 font-bold text-4xl mb-2">3步</div>
            <div className="text-gray-600">从数据到图表</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-blue-600 font-bold text-4xl mb-2">100%</div>
            <div className="text-gray-600">AI对话，开箱即用</div>
          </div>
        </div>
      </div>
      
      {/* 装饰元素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-200 rounded-full opacity-20"></div>
      </div>
    </section>
  );
};

export default HeroSection;
