import { useState, useRef, useEffect } from "react";
import { Send, Copy, Code as CodeIcon, Bot, User, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
// 修复重复导入 Header 的问题，注释掉冲突的导入
// import { Header } from "@radix-ui/react-accordion";
import Header from "@/components/home/Header";

const Ai = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // 模拟发送消息和接收回复
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // 添加用户消息
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setIsLoading(true);
    
    // 模拟API延迟
    setTimeout(() => {
      // 根据用户输入生成不同的回复
      let botResponse = "";
      let chartData = null;
      
      if (input.toLowerCase().includes("柱状图") || input.toLowerCase().includes("bar chart")) {
        botResponse = "好的，这是一个柱状图示例：";
        chartData = {
          type: "bar",
          data: [
            { name: "一月", value: 400 },
            { name: "二月", value: 300 },
            { name: "三月", value: 500 },
            { name: "四月", value: 280 },
            { name: "五月", value: 590 },
            { name: "六月", value: 320 }
          ]
        };
      } else if (input.toLowerCase().includes("饼图") || input.toLowerCase().includes("pie chart")) {
        botResponse = "好的，这是一个饼图示例：";
        chartData = {
          type: "pie",
          data: [
            { name: "苹果", value: 400 },
            { name: "香蕉", value: 300 },
            { name: "橙子", value: 300 },
            { name: "葡萄", value: 200 },
            { name: "西瓜", value: 278 }
          ]
        };
      } else if (input.toLowerCase().includes("折线图") || input.toLowerCase().includes("line chart")) {
        botResponse = "好的，这是一个折线图示例：";
        chartData = {
          type: "line",
          data: [
            { name: "一月", value: 400 },
            { name: "二月", value: 300 },
            { name: "三月", value: 500 },
            { name: "四月", value: 280 },
            { name: "五月", value: 590 },
            { name: "六月", value: 320 }
          ]
        };
      } else {
        botResponse = "我可以帮你生成各种图表。请尝试输入以下内容：\n\n- 生成柱状图\n- 生成饼图\n- 生成折线图";
      }
      
      // 添加机器人回复
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: botResponse,
        chartData: chartData,
        code: chartData ? generateChartCode(chartData) : null
      }]);
      
      setInput("");
      setIsLoading(false);
    }, 1000);
  };
  
  // 生成图表代码
  const generateChartCode = (chartData) => {
    if (chartData.type === "bar") {
      return `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const BarChartExample = () => {
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
      return `import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PieChartExample = () => {
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
      return `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = ${JSON.stringify(chartData.data, null, 2)};

const LineChartExample = () => {
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
    }
    
    return "";
  };
  
  // 复制代码到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("代码已复制到剪贴板");
  };
  
  // 渲染图表
  const renderChart = (chartData) => {
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
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
      
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
    }
    
    return null;
  };

  return (
    <div>
      <Header />
      
      <main className="flex-1 overflow-hidden flex flex-col mt-20" >
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                {/* 检查图片链接是否有效，可考虑添加错误处理 */}
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=chart,data&width=200&height=200&source=meituan" 
                  alt="图表助手" 
                  className="mx-auto object-cover w-32 h-32 mb-6"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">图表生成助手</h2>
                <p className="text-gray-600 mb-6">输入你的需求，我将为你生成相应的图表</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {[
                    { text: "生成柱状图", icon: "📊" },
                    { text: "生成饼图", icon: "🥧" },
                    { text: "生成折线图", icon: "📈" }
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
                      onClick={() => {
                        setInput(suggestion.text);
                        setTimeout(() => {
                          document.getElementById("chat-input").focus();
                        }, 100);
                      }}
                    >
                      <div className="text-2xl mb-2">{suggestion.icon}</div>
                      <div className="text-gray-800">{suggestion.text}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start mb-2">
                      <div className={`p-1.5 rounded-full mr-2 ${
                        message.role === "user" 
                          ? "bg-blue-500" 
                          : "bg-gray-100"
                      }`}>
                        {message.role === "user" 
                          ? <User className="h-4 w-4 text-white" /> 
                          : <Bot className="h-4 w-4 text-blue-600" />
                        }
                      </div>
                      <div className={`font-medium ${
                        message.role === "user" ? "text-white" : "text-gray-800"
                      }`}>
                        {message.role === "user" ? "你" : "图表助手"}
                      </div>
                    </div>
                    
                    <div className="whitespace-pre-wrap">
                      {message.content}
                    </div>
                    
                    {message.chartData && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        {renderChart(message.chartData)}
                      </div>
                    )}
                    
                    {message.code && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm font-medium text-gray-700">图表代码</div>
                          <button 
                            onClick={() => copyToClipboard(message.code)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                          {message.code}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <div className="flex-1 bg-gray-100 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
                <textarea
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入你的图表需求..."
                  className="w-full bg-transparent border-0 focus:outline-none resize-none py-2 px-2 max-h-32"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`p-3 rounded-full ${
                  isLoading || !input.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
            <div className="mt-2 text-xs text-gray-500 text-center">
              提示: 尝试输入"生成柱状图"、"生成饼图"或"生成折线图"
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ai;
