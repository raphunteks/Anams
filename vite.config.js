import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Konfigurasi Server Lokal
  server: {
    port: 3000,
    strictPort: true,
  },

  // Fallback untuk kompabilitas library yang menggunakan process.env
  define: {
    'process.env': {}
  },

  // Optimasi Build (Untuk Vercel / Production)
  build: {
    outDir: 'dist',
    sourcemap: false, // Mematikan sourcemap untuk produksi agar lebih ringan & aman
    chunkSizeWarningLimit: 1600, // Menaikkan batas peringatan ukuran file
    
    rollupOptions: {
      output: {
        // Memecah kode (Code Splitting) agar loading website jauh lebih cepat
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'vendor-firebase'; // Memisahkan script Firebase
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'; // Memisahkan script React
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'; // Memisahkan script Icon
            }
            return 'vendor'; // Sisa library lainnya
          }
        }
      }
    }
  }
})
