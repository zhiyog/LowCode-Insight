import { BarChart2, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart2 className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">LowCode Insight</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              通过自然语言和拖拽配置生成专业数据可视化图表，无需编程知识
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">产品</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">功能</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">模板库</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">更新日志</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">资源</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">文档</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">教程</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">API参考</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">社区</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">公司</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">关于我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">博客</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">联系我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">加入我们</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2023 LowCode Insight. 保留所有权利。</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300">隐私政策</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300">服务条款</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300">Cookie 设置</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
