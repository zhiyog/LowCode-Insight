import { BarChart2 } from "lucide-react";
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  // 定义 GitHub 链接按钮
// 引入 lucide-react 库中的 GitHub 图标

const GitHubLink = () => (
  <a 
    href="https://github.com/zhiyog/LowCode-Insight" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
  >
    <svg t="1750303699414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2046" width="36" height="36"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="2047" fill="#2c2c2c"></path></svg>
  </a>
);


// 定义日夜切换按钮
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // 这里可以添加切换主题的逻辑，例如修改文档的类名
    document.documentElement.classList.toggle('dark',!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-full transition-colors"
    >
      {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
    </button>
    );
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center justify-start">  {/* 确保这里使用了 justify-start */}
          <BarChart2 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">LowCode Insight</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#/" className="text-gray-600 hover:text-blue-600 font-medium">首页</a>
          <a href="#/ai" className="text-gray-600 hover:text-blue-600 font-medium">AI</a>
          <a href="#/docs" className="text-gray-600 hover:text-blue-600 font-medium">文档</a>
          <a href="#/about" className="text-gray-600 hover:text-blue-600 font-medium">关于</a>
        </nav>

        <div className="flex items-center space-x-4">
          <GitHubLink />
          <ThemeToggle />
        </div>
      </div>
    </header>

  );
};

export default Header;