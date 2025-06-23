import { HomeIcon, BarChart2, Settings, FileText, Code } from "lucide-react";
import Index from "./pages/Index.jsx";
import Doc from "./pages/Doc.jsx";
import About from "./pages/About.jsx";
import CodePage from "./pages/Code.jsx";
import Ai from "./pages/Ai.jsx";

/**
* 配置路由
*/
export const navItems = [
{
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "AI",
    to: "/ai",
    icon: <Code className="h-4 w-4" />,
    page: <Ai />,
},
{
    title: "模板",
    to: "/templates",
    icon: <FileText className="h-4 w-4" />,
    page: <CodePage />,
},
{
    title: "关于",
    to: "/about",
    icon: <Settings className="h-4 w-4" />,
    page: <About />,
},
{
    title: "文档",
    to: "/docs",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <Doc />,
  },  
];
