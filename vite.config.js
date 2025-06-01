import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for production (adjust if needed)
  base: '/',

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Auto-open browser
    host: true, // Allow external connections
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
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

  // Plugin configuration (add plugins here as needed)
  plugins: [
    // Add any Vite plugins you want to use
  ],

  // Optimization
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'aos', 'lenis'],
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
