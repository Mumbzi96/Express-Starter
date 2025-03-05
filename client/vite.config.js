import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log("VITE_TARGET:", process.env.VITE_TARGET);
console.log("VITE_TARGET_LIVE:", process.env.VITE_TARGET_LIVE);
console.log("Proxy Target:", process.env.VITE_ENVIRONMENT === "dev" ? process.env.VITE_TARGET : process.env.VITE_TARGET_LIVE);


export default defineConfig({
  base: "/",
  define: { 'process.env': {
      VITE_API_URL: process.env.VITE_ENVIRONMENT == "dev" ? process.env.VITE_API_URL : process.env.VITE_API_URL_LIVE
    },
    _global: {},
  },
  server: {
    host: process.env.VITE_HOST,
    proxy: {
      "/api": {
        //? backend port
        target: process.env.VITE_ENVIRONMENT == "dev" ? process.env.VITE_TARGET : process.env.VITE_TARGET_LIVE,

        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    port: Number(process.env.VITE_PORT),
  },
  plugins: [
    react(),
  ],
  assetsInclude: ['**/*.PNG']
});