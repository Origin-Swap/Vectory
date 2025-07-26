import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
});
