import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Security headers applied in the dev server.
// For production (Vercel), these are set via vercel.json.
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export default defineConfig({
  base: '', // Crucial for Vercel + React Router (no leading slash or './')
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Increase chunk warning threshold slightly (lucide-react is large)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          lucide: ['lucide-react'],
          axios: ['axios'],
        },
      },
    },
  },
  server: {
    port: 3000,
    headers: securityHeaders,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    headers: securityHeaders,
  },
});
