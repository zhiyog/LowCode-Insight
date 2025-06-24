import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from "recharts";

/**
 * 散点图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.xDataKey - X轴数据键名
 * @param {string} props.yDataKey - Y轴数据键名
 * @param {string} props.zDataKey - Z轴数据键名（用于点大小）
 * @param {Array} props.scatters - 散点图配置数组
 * @param {boolean} props.grid - 是否显示网格线
 * @param {Object} props.layout - 布局配置
 */
const ScatterChartTemplate = ({ 
  data = [], 
  xDataKey = "x", 
  yDataKey = "y",
  zDataKey,
  scatters = [{ name: "数据点", color: "#3b82f6" }],
  grid = true,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <ScatterChart>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xDataKey} name={xDataKey} />
        <YAxis dataKey={yDataKey} name={yDataKey} />
        {zDataKey && <ZAxis dataKey={zDataKey} range={[60, 400]} name={zDataKey} />}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        {scatters.map((scatter, index) => (
          <Scatter 
            key={index}
            name={scatter.name} 
            data={scatter.data || data} 
            fill={scatter.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartTemplate;
