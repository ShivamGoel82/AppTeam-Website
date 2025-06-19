import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // ✅ Ensure assets work correctly with SPA routing on Vercel
  plugins: [react()],
  build: {
    outDir: '../dist', // ✅ Must match 'outputDirectory' in vercel.json
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          lucide: ['lucide-react'] // ✅ Optional: optimize lucide
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ Backend proxy for dev
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
