// 移除 antd 相关导入
// 手动实现布局和菜单样式
const Doc = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <div style={{ width: 200, backgroundColor: '#001529', color: 'white' }}>
        <div style={{ padding: '20px 0' }}>
          <div style={{ padding: '12px 24px', cursor: 'pointer' }}>文档概述</div>
          <div style={{ padding: '12px 24px', cursor: 'pointer' }}>快速开始</div>
          <div style={{ padding: '12px 24px', cursor: 'pointer' }}>API 参考</div>
        </div>
      </div>
      {/* 内容区域 */}
      <div style={{ flex: 1, padding: '24px', minHeight: 280 }}>
        <h1>Doc</h1>
        <p>这里是文档的具体内容，可以参考 Ant Design 的文档风格，添加详细的使用说明、示例代码等。</p>
      </div>
    </div>
  );
};

export default Doc;