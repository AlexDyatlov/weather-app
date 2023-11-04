import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    host: true,
    port: Number(process.env.VITE_PORT) || 8080,
    hmr: true
  },
  preview: {
    port: Number(process.env.VITE_PORT) || 8080
  },
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.{js,jsx,ts,tsx}'],
      exclude: []
    })
  ]
});
