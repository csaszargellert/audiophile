import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: false,
      clientPort: 5173,
    },
  },
});
