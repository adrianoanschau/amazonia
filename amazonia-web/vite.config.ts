import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://amazonia-api.up.railway.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
