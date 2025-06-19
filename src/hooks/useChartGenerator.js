import { useState } from "react";

/**
 * 用于处理图表生成逻辑的自定义钩子
 * @returns {Object} 图表生成相关的状态和方法
 */
const useChartGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedChart, setGeneratedChart] = useState(null);
  const [error, setError] = useState(null);
  
  // 模拟图表类型
  const chartTypes = ["bar", "line", "pie", "area", "scatter", "radar", "composed", "treemap"];
  
  // 模拟数据生成
  const generateRandomData = (type, length = 6) => {
    if (type === "scatter") {
      return Array.from({ length }, (_, i) => ({
        x: Math.floor(Math.random() * 200) + 50,
        y: Math.floor(Math.random() * 400) + 50,
        z: Math.floor(Math.random() * 500) + 100
      }));
    } else if (type === "radar") {
      return Array.from({ length }, (_, i) => ({
        subject: `指标${i + 1}`,
        value: Math.floor(Math.random() * 100) + 20
      }));
    } else if (type === "composed") {
      return Array.from({ length }, (_, i) => ({
        name: `数据${i + 1}`,
        bar: Math.floor(Math.random() * 500) + 100,
        line: Math.floor(Math.random() * 300) + 50,
        area: Math.floor(Math.random() * 200) + 100
      }));
    } else if (type === "treemap") {
      const categories = ["类别A", "类别B", "类别C"];
      return categories.map(category => ({
        name: category,
        children: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, i) => ({
          name: `${category}-项目${i + 1}`,
          value: Math.floor(Math.random() * 5000) + 1000
        }))
      }));
    } else {
      return Array.from({ length }, (_, i) => ({
        name: `数据${i + 1}`,
        value: Math.floor(Math.random() * 500) + 100
      }));
    }
  };
  
  // 根据提示生成图表
  const generateChart = async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      setError("请输入有效的图表描述");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 简单的关键词匹配来决定图表类型
      let chartType = "bar"; // 默认类型
      
      if (prompt.includes("折线") || prompt.includes("趋势") || prompt.includes("line")) {
        chartType = "line";
      } else if (prompt.includes("饼图") || prompt.includes("占比") || prompt.includes("pie")) {
        chartType = "pie";
      } else if (prompt.includes("柱状") || prompt.includes("对比") || prompt.includes("bar")) {
        chartType = "bar";
      } else if (prompt.includes("面积") || prompt.includes("area")) {
        chartType = "area";
      } else if (prompt.includes("散点") || prompt.includes("scatter")) {
        chartType = "scatter";
      } else if (prompt.includes("雷达") || prompt.includes("radar")) {
        chartType = "radar";
      } else if (prompt.includes("复合") || prompt.includes("组合") || prompt.includes("composed")) {
        chartType = "composed";
      } else if (prompt.includes("矩形树") || prompt.includes("层次") || prompt.includes("treemap")) {
        chartType = "treemap";
      }
      
      // 生成随机数据
      const data = generateRandomData(chartType);
      
      // 设置生成的图表
      setGeneratedChart({
        type: chartType,
        data: data,
        title: `基于"${prompt.substring(0, 20)}${prompt.length > 20 ? '...' : ''}"生成的图表`,
        description: `这是一个根据您的描述"${prompt}"自动生成的${
          chartType === 'bar' ? '柱状图' : 
          chartType === 'line' ? '折线图' : 
          chartType === 'pie' ? '饼图' : 
          chartType === 'area' ? '面积图' : 
          chartType === 'scatter' ? '散点图' :
          chartType === 'radar' ? '雷达图' :
          chartType === 'composed' ? '复合图表' : '矩形树图'
        }`
      });
    } catch (err) {
      setError("生成图表时出错，请重试");
      console.error("Chart generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 清除当前生成的图表
  const clearChart = () => {
    setGeneratedChart(null);
    setError(null);
  };
  
  return {
    isGenerating,
    generatedChart,
    error,
    generateChart,
    clearChart
  };
};

export default useChartGenerator;
