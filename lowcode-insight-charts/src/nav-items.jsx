import { HomeIcon, BarChartIcon, PieChartIcon, LineChartIcon, EditIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ChartEditorPage from "./pages/ChartEditorPage.jsx";

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
    title: "柱状图",
    to: "/bar",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "饼图",
    to: "/pie",
    icon: <PieChartIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "折线图",
    to: "/line",
    icon: <LineChartIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "图表编辑器",
    to: "/editor/:chartType",
    icon: <EditIcon className="h-4 w-4" />,
    page: <ChartEditorPage />,
},
];
