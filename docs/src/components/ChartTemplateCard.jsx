import { useState } from "react";
import { Code, Download, Share2 } from "lucide-react";

/**
 * 图表模板卡片组件
 * @param {Object} props - 组件属性
 * @param {string} props.title - 模板标题
 * @param {React.ReactNode} props.icon - 模板图标
 * @param {string} props.description - 模板描述
 * @param {React.ReactNode} props.preview - 模板预览组件
 * @param {Function} props.onSelect - 选择模板的回调函数
 */
const ChartTemplateCard = ({ title, icon, description, preview, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <div className="relative h-40 bg-gray-50 p-2 border-b border-gray-100">
        {preview}
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors">
              查看详情
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="mr-2">{icon}</div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between text-gray-500 text-sm">
          <div className="flex items-center">
            <Code className="h-4 w-4 mr-1" />
            <span>React</span>
          </div>
          <div className="flex space-x-2">
            <button className="hover:text-blue-600">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="hover:text-blue-600">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTemplateCard;
