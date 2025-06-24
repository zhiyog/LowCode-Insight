import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from "recharts";

/**
 * 雷达图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.angleKey - 角度轴数据键名
 * @param {Array} props.radars - 雷达图配置数组
 * @param {Object} props.layout - 布局配置
 */
const RadarChartTemplate = ({ 
  data = [], 
  angleKey = "subject", 
  radars = [{ dataKey: "value", color: "#3b82f6" }],
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={angleKey} />
        <PolarRadiusAxis />
        <Tooltip />
        {radars.map((radar, index) => (
          <Radar 
            key={index} 
            name={radar.name || radar.dataKey} 
            dataKey={radar.dataKey} 
            stroke={radar.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            fill={radar.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            fillOpacity={0.6} 
          />
        ))}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartTemplate;
