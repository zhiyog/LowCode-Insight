import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const AIInputSection = ({ onGenerateChart, isLoading }) => {
  const [prompt, setPrompt] = useState("");
  const placeholderText = useTranslation("input.placeholder");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerateChart(prompt);
    }
  };

  return (
    <div className="p-6 border-r border-gray-200">
      <h3 className="text-lg font-semibold mb-4">输入你的图表需求</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：帮我创建一个展示游戏数据趋势的柱状图"
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        
        <div className="mt-4 space-y-3">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-white font-medium transition-colors ${
              isLoading || !prompt.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>生成图表</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">示例提示:</h4>
        <div className="space-y-2">
          {[
            "创建一个展示过去12个月用户增长的折线图",
            "生成一个比较不同产品类别销售额的饼图",
            "帮我做一个展示网站流量来源的条形图",
            "分析2023年各季度销售数据的趋势图",
            "制作一个显示市场份额的饼图"
          ].map((example, index) => (
            <div 
              key={index}
              onClick={() => setPrompt(example)}
              className="text-sm bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
            >
              {example}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInputSection;
