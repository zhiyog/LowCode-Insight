import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/packages/index.js', // 你需要打包的入口文件
      name: 'lowcode-insight-charts', // 库的名字
      fileName: (format) => `lowcode-insight-charts.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 确保外部依赖（如 React, Vue）不会被打包
      external: ['react', 'react-dom'], // 根据需要添加外部依赖
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
