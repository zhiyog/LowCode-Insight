import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

/**
 * 复合图表模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.xDataKey - X轴数据键名
 * @param {Array} props.bars - 柱状图配置数组
 * @param {Array} props.lines - 折线图配置数组
 * @param {Array} props.areas - 面积图配置数组
 * @param {boolean} props.grid - 是否显示网格线
 * @param {Object} props.layout - 布局配置
 */
const ComposedChartTemplate = ({ 
  data = [], 
  xDataKey = "name", 
  bars = [],
  lines = [],
  areas = [],
  grid = true,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <ComposedChart data={data}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        
        {areas.map((area, index) => (
          <Area 
            key={`area-${index}`} 
            type="monotone" 
            dataKey={area.dataKey} 
            fill={area.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            stroke={area.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            fillOpacity={0.6}
            name={area.name || area.dataKey}
          />
        ))}
        
        {bars.map((bar, index) => (
          <Bar 
            key={`bar-${index}`} 
            dataKey={bar.dataKey} 
            fill={bar.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            name={bar.name || bar.dataKey}
          />
        ))}
        
        {lines.map((line, index) => (
          <Line 
            key={`line-${index}`} 
            type="monotone" 
            dataKey={line.dataKey} 
            stroke={line.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            name={line.name || line.dataKey}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartTemplate;
