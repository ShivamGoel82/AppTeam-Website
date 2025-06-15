import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: [
      'af28-110-235-233-235.ngrok-free.app',
    ],
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
