import { useState } from "react";
import { Menu, X, ChevronDown, ExternalLink, Bot, Sparkles, Zap, Brain, Lightbulb, MessageSquare, Code, Cpu } from "lucide-react";

const AINavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const navItems = [
    {
      title: "AI功能",
      hasDropdown: true,
      icon: <Sparkles className="h-4 w-4 mr-1" />,
      dropdownItems: [
        { 
          title: "智能图表生成", 
          description: "通过自然语言描述自动生成专业图表",
          icon: <Bot className="h-5 w-5 text-blue-500" />
        },
        { 
          title: "数据分析助手", 
          description: "AI辅助数据分析和洞察发现",
          icon: <Brain className="h-5 w-5 text-purple-500" />
        },
        { 
          title: "自动报表生成", 
          description: "一键生成专业数据报表和分析文档",
          icon: <Lightbulb className="h-5 w-5 text-yellow-500" />
        },
        { 
          title: "智能问答", 
          description: "针对数据和图表的智能问答系统",
          icon: <MessageSquare className="h-5 w-5 text-green-500" />
        }
      ]
    },
    {
      title: "模型与能力",
      hasDropdown: true,
      icon: <Cpu className="h-4 w-4 mr-1" />,
      dropdownItems: [
        { 
          title: "大语言模型", 
          description: "基于先进LLM的自然语言理解和生成能力",
          icon: <Zap className="h-5 w-5 text-orange-500" />
        },
        { 
          title: "计算机视觉", 
          description: "图像识别和视觉数据分析能力",
          icon: <Code className="h-5 w-5 text-indigo-500" />
        },
        { 
          title: "多模态融合", 
          description: "文本、图像和数据的多模态理解与生成",
          icon: <Cpu className="h-5 w-5 text-red-500" />
        }
      ]
    },
    {
      title: "AI开放平台",
      hasDropdown: false,
      icon: <ExternalLink className="h-4 w-4 mr-1" />,
      link: "/ai-platform"
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* 桌面端导航 */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.icon}
                        {item.title}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {activeDropdown === index && (
                        <div className="absolute z-10 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                              <a
                                key={dropdownIndex}
                                href="#"
                                className="block px-4 py-3 hover:bg-gray-50"
                              >
                                <div className="flex items-center">
                                  {dropdownItem.icon}
                                  <div className="ml-3">
                                    <div className="font-medium text-gray-800">{dropdownItem.title}</div>
                                    <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.icon}
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <Sparkles className="h-4 w-4 mr-1" />
              体验AI能力
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                    >
                      <span className="flex items-center">
                        {item.icon}
                        {item.title}
                      </span>
                      <ChevronDown className={`h-4 w-4 ${activeDropdown === index ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === index && (
                      <div className="pl-4 pr-2 py-2 space-y-2">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <a
                            key={dropdownIndex}
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                          >
                            <div className="flex items-center">
                              {dropdownItem.icon}
                              <span className="ml-2">{dropdownItem.title}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {item.icon}
                    <span className="ml-1">{item.title}</span>
                  </a>
                )}
              </div>
            ))}
            <button className="flex items-center w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">
              <Sparkles className="h-4 w-4 mr-1" />
              体验AI能力
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AINavbar;
