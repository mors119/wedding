import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
