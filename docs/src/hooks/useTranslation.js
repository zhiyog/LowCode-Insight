import { useState, useEffect } from "react";

/**
 * 简单的翻译钩子，用于处理多语言支持
 * @param {string} key - 翻译键
 * @param {Object} params - 替换参数
 * @returns {string} 翻译后的文本
 */
const useTranslation = (key, params = {}) => {
  const [translation, setTranslation] = useState("");
  
  // 简单的翻译字典
  const translations = {
    zh: {
      "app.title": "LowCode Insight - AI低代码图表平台",
      "app.description": "通过自然语言和拖拽配置生成专业数据可视化图表",
      "chart.generate": "生成图表",
      "chart.preview": "图表预览",
      "chart.export": "导出图表",
      "chart.share": "分享图表",
      "chart.edit": "编辑图表",
      "input.placeholder": "输入你的图表需求...",
      "feature.ai": "AI智能生成",
      "feature.drag": "拖拽式设计",
      "feature.export": "一键导出",
      "feature.template": "模板复用",
      "cta.start": "开始使用",
      "cta.learn": "了解更多",
    },
    en: {
      "app.title": "LowCode Insight - AI-powered Chart Platform",
      "app.description": "Generate professional data visualizations through natural language and drag-and-drop",
      "chart.generate": "Generate Chart",
      "chart.preview": "Chart Preview",
      "chart.export": "Export Chart",
      "chart.share": "Share Chart",
      "chart.edit": "Edit Chart",
      "input.placeholder": "Enter your chart requirements...",
      "feature.ai": "AI Generation",
      "feature.drag": "Drag & Drop Design",
      "feature.export": "One-click Export",
      "feature.template": "Template Reuse",
      "cta.start": "Get Started",
      "cta.learn": "Learn More",
    }
  };
  
  useEffect(() => {
    // 默认使用中文
    const locale = "zh";
    let text = translations[locale][key] || key;
    
    // 替换参数
    if (params && typeof params === "object") {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }
    
    setTranslation(text);
  }, [key, params]);
  
  return translation;
};

export default useTranslation;
