import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/**
 * 折线图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.xDataKey - X轴数据键名
 * @param {Array} props.lines - 折线配置数组，每个元素包含 dataKey 和 color
 * @param {boolean} props.grid - 是否显示网格线
 * @param {Object} props.layout - 布局配置
 */
const LineChartTemplate = ({ 
  data = [], 
  xDataKey = "name", 
  lines = [{ dataKey: "value", color: "#3b82f6" }],
  grid = true,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <LineChart data={data}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line 
            key={index} 
            type="monotone" 
            dataKey={line.dataKey} 
            stroke={line.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            name={line.name || line.dataKey}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartTemplate;
