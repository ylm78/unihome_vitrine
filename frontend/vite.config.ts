import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom'],
    // Optimiser les dépendances pour un chargement plus rapide
    force: true,
  },
  server: {
    port: 5090,
  },
  build: {
    // Optimisations pour la production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log en production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les dépendances lourdes pour meilleur caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'lucide-vendor': ['lucide-react'],
        },
        // Optimiser les noms de chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimiser la taille du bundle
    chunkSizeWarningLimit: 1000,
    // Source maps pour le debug (désactivé en prod pour réduire la taille)
    sourcemap: false,
    // Optimiser les assets
    assetsInlineLimit: 4096, // Inline les petits assets (< 4KB)
  },
});
