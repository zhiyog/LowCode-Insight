import { HomeIcon, BarChart2, Settings, FileText } from "lucide-react";
import Index from "./pages/Index.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
{
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "图表库",
    to: "/charts",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <div>图表库页面</div>,
},
{
    title: "模板",
    to: "/templates",
    icon: <FileText className="h-4 w-4" />,
    page: <div>模板页面</div>,
},
{
    title: "设置",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <div>设置页面</div>,
},
];
