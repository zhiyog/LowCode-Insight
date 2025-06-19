import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/**
 * 面积图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.xDataKey - X轴数据键名
 * @param {Array} props.areas - 面积图配置数组，每个元素包含 dataKey 和 color
 * @param {boolean} props.grid - 是否显示网格线
 * @param {boolean} props.stacked - 是否堆叠显示
 * @param {Object} props.layout - 布局配置
 */
const AreaChartTemplate = ({ 
  data = [], 
  xDataKey = "name", 
  areas = [{ dataKey: "value", color: "#3b82f6" }],
  grid = true,
  stacked = false,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <AreaChart data={data}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {areas.map((area, index) => (
          <Area 
            key={index} 
            type="monotone" 
            dataKey={area.dataKey} 
            stackId={stacked ? "1" : index}
            fill={area.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            stroke={area.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            fillOpacity={0.6}
            name={area.name || area.dataKey}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartTemplate;
