import { useState } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const Navbar = () => {
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
      title: "组件",
      hasDropdown: true,
      dropdownItems: [
        { title: "图表组件", description: "各种类型的图表组件，包括柱状图、折线图、饼图等" },
        { title: "数据处理", description: "数据转换、过滤和聚合组件" },
        { title: "交互控件", description: "图表交互和控制组件" },
        { title: "布局组件", description: "仪表盘和报表布局组件" }
      ]
    },
    {
      title: "API",
      hasDropdown: true,
      dropdownItems: [
        { title: "图表生成API", description: "通过自然语言生成图表的API" },
        { title: "数据处理API", description: "数据清洗和转换API" },
        { title: "主题定制API", description: "自定义图表样式和主题" },
        { title: "导出API", description: "图表导出为各种格式" }
      ]
    },
    {
      title: "文档",
      hasDropdown: false,
      link: "/docs"
    },
    {
      title: "示例",
      hasDropdown: false,
      link: "/examples"
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
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
                        className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                      >
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
                                <div className="font-medium text-gray-800">{dropdownItem.title}</div>
                                <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <a
              href="https://github.com/your-repo/lowcode-insight"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <span className="mr-1">开放平台</span>
              <ExternalLink className="h-4 w-4" />
            </a>
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
                      className="flex items-center justify-between w-full text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item.title}
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
                            {dropdownItem.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            <a
              href="https://github.com/your-repo/lowcode-insight"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              <span className="mr-1">开放平台</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
