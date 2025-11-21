import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ⚠️ 注意：如果你部署到 https://username.github.io/repo-name/
  // 请将下面的 './' 改为 '/repo-name/'。
  // 如果不确定，保持 './' 通常也能工作，但在路由跳转时要小心。
  base: './', 
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    }
  }
});