import { useState } from "react";
import { Sparkles } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

// 定义点击标题的回调函数
const handleTitleClick = () => {
  console.log('标题被点击了');
  // 这里可以添加更多标题点击后的逻辑
};

// 定义点击描述的回调函数
const handleDescriptionClick = () => {
  console.log('描述被点击了');
  // 这里可以添加更多描述点击后的逻辑
};

// 定义点击图表类型等信息框的回调函数
const handleInfoBoxClick = (info) => {
  console.log(`${info} 信息框被点击了`);
  // 这里可以添加更多信息框点击后的逻辑
};

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
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 cursor-pointer"
            onClick={handleTitleClick}
          >
            AI驱动的低代码图表平台
          </h1>
          <p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto cursor-pointer"
            onClick={handleDescriptionClick}
          >
            通过自然语言和简单拖拽，轻松创建专业数据可视化图表，无需编程知识
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div 
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer"
            onClick={() => handleInfoBoxClick('图表类型')}
          >
            <div className="text-blue-600 font-bold text-4xl mb-2">10+</div>
            <div className="text-gray-600">图表类型</div>
          </div>
          <div 
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer"
            onClick={() => handleInfoBoxClick('从数据到图表')}
          >
            <div className="text-blue-600 font-bold text-4xl mb-2">3步</div>
            <div className="text-gray-600">从数据到图表</div>
          </div>
          <div 
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer"
            onClick={() => handleInfoBoxClick('无代码操作')}
          >
            <div className="text-blue-600 font-bold text-4xl mb-2">100%</div>
            <div className="text-gray-600">无代码操作</div>
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
