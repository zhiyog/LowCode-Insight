import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Treemap } from "recharts";
import { Download, Share2, Edit2, Code as CodeIcon } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ChartPreview = ({ chartData }) => {
  const [activeTab, setActiveTab] = useState("preview");
  const previewText = useTranslation("chart.preview");
  const codeText = useTranslation("chart.edit");

  const renderChart = () => {
    if (!chartData) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <p className="text-gray-500">输入你的需求，AI将为你生成图表</p>
        </div>
      );
    }

    if (chartData.type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData.data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "line") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "area") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "scatter") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name="x" />
            <YAxis dataKey="y" name="y" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="数据点" data={chartData.data} fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "radar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="数值" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "composed") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bar" fill="#8884d8" />
            <Line type="monotone" dataKey="line" stroke="#ff7300" />
            <Area type="monotone" dataKey="area" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.6} />
          </ComposedChart>
        </ResponsiveContainer>
      );
    } else if (chartData.type === "treemap") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <Treemap
            data={chartData.data}
            dataKey="value"
            aspectRatio={4/3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      );
    }
  };

  const getChartCode = () => {
    if (!chartData) return "// 生成图表后将显示代码";
    
    let code = "";
    
    if (chartData.type === "bar") {
      code = `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "pie") {
      code = `import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({name, percent}) => \`\${name}: \${(percent * 100).toFixed(0)}%\`}
        >
          {data.map((entry, index) => (
            <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "line") {
      code = `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "area") {
      code = `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "scatter") {
      code = `import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" name="x" />
        <YAxis dataKey="y" name="y" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="数据点" data={data} fill="#3b82f6" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "radar") {
      code = `import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="数值" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "composed") {
      code = `import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="bar" fill="#8884d8" />
        <Line type="monotone" dataKey="line" stroke="#ff7300" />
        <Area type="monotone" dataKey="area" fill="#82ca9d" stroke="#82ca9d" fillOpacity={0.6} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};`;
    } else if (chartData.type === "treemap") {
      code = `import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        data={data}
        dataKey="value"
        aspectRatio={4/3}
        stroke="#fff"
        fill="#8884d8"
      >
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};`;
    }
    
    return code;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {chartData ? chartData.title : "图表预览"}
        </h3>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-sm rounded ${
              activeTab === "preview" 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            预览
          </button>
          <button 
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1 text-sm rounded ${
              activeTab === "code" 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            代码
          </button>
        </div>
      </div>
      
      {chartData && (
        <p className="text-sm text-gray-600 mb-4">{chartData.description}</p>
      )}
      
      <div className="bg-gray-50 rounded-lg border border-gray-200 h-80 flex items-center justify-center overflow-hidden">
        {activeTab === "preview" ? (
          renderChart()
        ) : (
          <pre className="text-xs p-4 overflow-auto h-full w-full bg-gray-900 text-gray-100 rounded-lg">
            {getChartCode()}
          </pre>
        )}
      </div>
      
      {chartData && (
        <div className="mt-4 flex justify-end space-x-2">
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-gray-100">
            <Edit2 className="h-4 w-4" />
            <span>编辑</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-gray-100">
            <Share2 className="h-4 w-4" />
            <span>分享</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-gray-100">
            <Download className="h-4 w-4" />
            <span>导出</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartPreview;
