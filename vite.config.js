import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages deployment
  base:
    process.env.NODE_ENV === 'production' ? '/KFMegaGlass-web-preview/' : '/',

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable in production for smaller builds
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', 'aos', 'lenis'],
        },
      },
    },
  },

  // Asset handling
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp'],

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Optimization
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'aos', 'lenis'],
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
});
