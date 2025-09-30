import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import glsl from 'vite-plugin-glsl';
// import fs from 'node:fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync('./certs/localhost-key.pem'),
  //     cert: fs.readFileSync('./certs/localhost-cert.pem'),
  //   },
  //   host: 'localhost',
  //   port: 3000,
  // },
});
