import { HomeIcon, BarChart2, Settings, FileText, Code } from "lucide-react";
import Index from "./pages/Index.jsx";
import Doc from "./pages/Doc/index.jsx";
import About from "./pages/About/index.jsx";
import Ai from "./pages/Ai/index.jsx";

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
    title: "文档",
    to: "/docs",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <Doc />,
},  
{
    title: "关于",
    to: "/about",
    icon: <Settings className="h-4 w-4" />,
    page: <About />,
},
];
