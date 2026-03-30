import { defineConfig } from 'vite';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 로컬 개발 환경에서만 HTTPS 활성화 (.pem 파일이 있을 때만)
    https:
      fs.existsSync('localhost-key.pem') && fs.existsSync('localhost.pem')
        ? {
            key: fs.readFileSync('localhost-key.pem'),
            cert: fs.readFileSync('localhost.pem'),
          }
        : false,
  },
});
