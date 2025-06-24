import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

/**
 * 饼图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据
 * @param {string} props.nameKey - 名称键名
 * @param {string} props.dataKey - 数据键名
 * @param {Array} props.colors - 自定义颜色数组
 * @param {Object} props.layout - 布局配置
 */
const PieChartTemplate = ({ 
  data = [], 
  nameKey = "name", 
  dataKey = "value",
  colors = COLORS,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartTemplate;
