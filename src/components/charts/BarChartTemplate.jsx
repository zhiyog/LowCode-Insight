import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/**
 * 柱状图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.xDataKey - X轴数据键名
 * @param {Array} props.bars - 柱状图配置数组，每个元素包含 dataKey 和 color
 * @param {boolean} props.grid - 是否显示网格线
 * @param {Object} props.layout - 布局配置
 */
const BarChartTemplate = ({ 
  data = [], 
  xDataKey = "name", 
  bars = [{ dataKey: "value", color: "#3b82f6" }],
  grid = true,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <BarChart data={data}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar 
            key={index} 
            dataKey={bar.dataKey} 
            fill={bar.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            name={bar.name || bar.dataKey}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartTemplate;
