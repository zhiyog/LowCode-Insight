import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

/**
 * 矩形树图模板组件
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 图表数据，需要包含 children 属性
 * @param {string} props.dataKey - 数据键名
 * @param {Array} props.colors - 自定义颜色数组
 * @param {Object} props.layout - 布局配置
 */
const TreemapTemplate = ({ 
  data = [], 
  dataKey = "value",
  colors = COLORS,
  layout = { width: "100%", height: 300 }
}) => {
  return (
    <ResponsiveContainer width={layout.width} height={layout.height}>
      <Treemap
        data={data}
        dataKey={dataKey}
        aspectRatio={4/3}
        stroke="#fff"
        fill="#8884d8"
      >
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreemapTemplate;
