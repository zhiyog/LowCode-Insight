import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Palette, Save, Edit } from 'lucide-react';

const ChartConfigEditor = ({ chartType, theme = 'dark', onClose }) => {
  const [activeTab, setActiveTab] = useState('style');
  const [config, setConfig] = useState({
    style: {
      colors: [],
      height: 300,
      showGrid: true,
      showLegend: true,
    },
    data: {
      dataKey: 'value',
      nameKey: 'name',
    }
  });

  // 处理配置更改
  const handleConfigChange = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-2xl rounded-xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* 头部 */}
          <div className={`flex items-center justify-between p-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-lg font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              图表配置与编辑
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 标签页 */}
          <div className="flex border-b px-4 gap-2 pt-2">
            <button
              onClick={() => setActiveTab('style')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'style'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Palette className="h-4 w-4" />
              样式配置
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'edit'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Edit className="h-4 w-4" />
              编辑图表
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'code'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Code className="h-4 w-4" />
              代码预览
            </button>
          </div>

          {/* 内容区域 */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {activeTab === 'style' && (
              <div className="space-y-4">
                {/* 颜色配置 */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    颜色配置
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#60A5FA'].map((color, index) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const newColors = [...config.style.colors];
                          if (newColors.includes(color)) {
                            newColors.splice(newColors.indexOf(color), 1);
                          } else {
                            newColors.push(color);
                          }
                          handleConfigChange('style', 'colors', newColors);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 高度配置 */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    图表高度
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="600"
                    value={config.style.height}
                    onChange={(e) => handleConfigChange('style', 'height', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {config.style.height}px
                  </div>
                </div>

                {/* 网格和图例配置 */}
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <input
                      type="checkbox"
                      checked={config.style.showGrid}
                      onChange={(e) => handleConfigChange('style', 'showGrid', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    显示网格
                  </label>
                  <label className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <input
                      type="checkbox"
                      checked={config.style.showLegend}
                      onChange={(e) => handleConfigChange('style', 'showLegend', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    显示图例
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'edit' && (
              <div className="space-y-4">
                {/* 数据配置 */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    数据键名
                  </label>
                  <input
                    type="text"
                    value={config.data.dataKey}
                    onChange={(e) => handleConfigChange('data', 'dataKey', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md text-sm ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="value"
                  />
                </div>

                {/* 名称键名配置 */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    名称键名
                  </label>
                  <input
                    type="text"
                    value={config.data.nameKey}
                    onChange={(e) => handleConfigChange('data', 'nameKey', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md text-sm ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="name"
                  />
                </div>

                {/* 图表类型特定配置 */}
                {chartType === 'bar' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      柱状图配置
                    </label>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        水平显示
                      </label>
                      <div>
                        <span className="text-sm">柱宽度</span>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          defaultValue="30"
                          className="w-full mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {chartType === 'pie' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      饼图配置
                    </label>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm">内半径</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="60"
                          className="w-full mt-1"
                        />
                      </div>
                      <label className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-300"
                        />
                        显示标签
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && (
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
              }`}>
                <code className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                  {JSON.stringify(config, null, 2)}
                </code>
              </pre>
            )}
          </div>

          {/* 底部按钮 */}
          <div className={`flex justify-end gap-3 p-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              取消
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white transition-colors ${
                theme === 'dark'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              <Save className="h-4 w-4" />
              保存配置
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChartConfigEditor;
