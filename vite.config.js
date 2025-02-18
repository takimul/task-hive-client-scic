// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with '/user' to the target server
      "/user": {
        target: "https://task-hive-server-nine.vercel.app",
        changeOrigin: true, // Ensures the proxy request headers are set correctly
        rewrite: (path) => path.replace(/^\/user/, ""), // Optional: rewrite the path if necessary
      },
    },
  },
});
