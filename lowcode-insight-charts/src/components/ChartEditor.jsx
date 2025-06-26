import React, { useState, useCallback } from 'react';
import { Copy, Check, Settings, Code, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ChartEditor = ({ 
  chartComponent, 
  defaultProps, 
  chartName,
  theme = 'dark',
  onPropsChange 
}) => {
  const [props, setProps] = useState(defaultProps);
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  // 处理属性变化
  const handlePropChange = useCallback((key, value) => {
    const newProps = { ...props, [key]: value };
    setProps(newProps);
    onPropsChange?.(newProps);
  }, [props, onPropsChange]);

  // 复制props到剪贴板
  const copyProps = useCallback(async () => {
    try {
      const propsString = JSON.stringify(props, null, 2);
      await navigator.clipboard.writeText(propsString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  }, [props]);

  // 渲染属性编辑器
  const renderPropEditor = (key, value) => {
    const type = typeof value;
    
    if (type === 'boolean') {
      return (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handlePropChange(key, e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm">{key}</span>
        </label>
      );
    }
    
    if (type === 'number') {
      return (
        <div>
          <label className="block text-sm font-medium mb-1">{key}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => handlePropChange(key, Number(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md text-sm ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      );
    }
    
    if (type === 'string') {
      return (
        <div>
          <label className="block text-sm font-medium mb-1">{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md text-sm ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      );
    }
    
    if (Array.isArray(value)) {
      return (
        <div>
          <label className="block text-sm font-medium mb-1">{key}</label>
          <textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handlePropChange(key, parsed);
              } catch (err) {
                // 忽略解析错误，用户可能正在输入
              }
            }}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md text-sm font-mono ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
      );
    }
    
    return null;
  };

  const tabs = [
    { id: 'preview', label: '预览', icon: <Eye className="h-4 w-4" /> },
    { id: 'props', label: '属性', icon: <Settings className="h-4 w-4" /> },
    { id: 'code', label: '代码', icon: <Code className="h-4 w-4" /> },
  ];

  return (
    <div className={`w-full h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* 头部 */}
      <div className={`border-b p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{chartName} 编辑器</h2>
          <button
            onClick={copyProps}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? '已复制' : '复制配置'}</span>
          </button>
        </div>
        
        {/* 标签页 */}
        <div className="flex space-x-1 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? `${theme === 'dark' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-indigo-500 text-white'
                    }` 
                  : `${theme === 'dark' 
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                      : 'bg-white text-gray-500 hover:bg-gray-100'
                    }`
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex h-full">
        {/* 左侧：图表预览 */}
        {activeTab === 'preview' && (
          <div className="flex-1 p-6">
            <div className={`h-96 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              {React.cloneElement(chartComponent, props)}
            </div>
          </div>
        )}

        {/* 属性编辑 */}
        {activeTab === 'props' && (
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {Object.entries(props).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  {renderPropEditor(key, value)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 代码展示 */}
        {activeTab === 'code' && (
          <div className="flex-1 p-6">
            <div className={`h-96 rounded-lg border p-4 overflow-auto ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <pre className="text-sm font-mono">
                <code>
{`import { ${chartName} } from './chart-library';

const MyChart = () => {
  return (
    <${chartName}
${Object.entries(props).map(([key, value]) => {
  if (typeof value === 'string') {
    return `      ${key}="${value}"`;
  } else if (typeof value === 'boolean') {
    return `      ${key}={${value}}`;
  } else if (typeof value === 'number') {
    return `      ${key}={${value}}`;
  } else {
    return `      ${key}={${JSON.stringify(value)}}`;
  }
}).join('\n')}
    />
  );
};`}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartEditor;
