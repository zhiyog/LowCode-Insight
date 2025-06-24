import { X, Copy, Download, Code as CodeIcon } from "lucide-react";
import { useState } from "react";

/**
 * 图表模板详情组件
 * @param {Object} props - 组件属性
 * @param {Object} props.template - 模板对象
 * @param {Function} props.onClose - 关闭详情的回调函数
 */
const ChartTemplateDetail = ({ template, onClose }) => {
  const [activeTab, setActiveTab] = useState("preview");
  
  if (!template) return null;
  
  const copyCode = () => {
    // 复制代码逻辑
    navigator.clipboard.writeText(getTemplateCode());
    alert("代码已复制到剪贴板");
  };
  
  const getTemplateCode = () => {
    // 根据模板类型生成不同的代码
    const componentName = template.id.charAt(0).toUpperCase() + template.id.slice(1) + "ChartTemplate";
    
    return `import { ${componentName} } from '@/components/charts';

// 示例数据
const data = ${JSON.stringify(template.sampleData || [], null, 2)};

// 在组件中使用
<${componentName} 
  data={data}
  ${template.codeProps || ''}
/>`;
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {template.icon}
              <h3 className="text-xl font-semibold ml-2">{template.name}</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "preview" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              预览
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "code" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("code")}
            >
              代码
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "docs" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("docs")}
            >
              文档
            </button>
          </div>
          
          {activeTab === "preview" && (
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-64">
                {template.component}
              </div>
              <p className="mt-4 text-gray-600">{template.description}</p>
            </div>
          )}
          
          {activeTab === "code" && (
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">React 组件代码</span>
                  <button 
                    onClick={copyCode}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <pre className="text-sm overflow-auto max-h-96 p-4 bg-gray-900 text-gray-100 rounded-lg">
                  {getTemplateCode()}
                </pre>
              </div>
            </div>
          )}
          
          {activeTab === "docs" && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">使用说明</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">安装依赖</h5>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm">
                    npm install recharts
                  </pre>
                </div>
                <div>
                  <h5 className="font-medium mb-2">组件属性</h5>
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 border-b text-left">属性名</th>
                        <th className="py-2 px-4 border-b text-left">类型</th>
                        <th className="py-2 px-4 border-b text-left">默认值</th>
                        <th className="py-2 px-4 border-b text-left">说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">data</td>
                        <td className="py-2 px-4 border-b">Array</td>
                        <td className="py-2 px-4 border-b">[]</td>
                        <td className="py-2 px-4 border-b">图表数据数组</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">xDataKey</td>
                        <td className="py-2 px-4 border-b">string</td>
                        <td className="py-2 px-4 border-b">"name"</td>
                        <td className="py-2 px-4 border-b">X轴数据键名</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">layout</td>
                        <td className="py-2 px-4 border-b">Object</td>
                        <td className="py-2 px-4 border-b">{`{ width: "100%", height: 300 }`}</td>
                        <td className="py-2 px-4 border-b">图表布局配置</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={copyCode}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
            >
              <CodeIcon className="h-4 w-4 mr-2" />
              复制代码
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
              <Download className="h-4 w-4 mr-2" />
              下载模板
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTemplateDetail;
