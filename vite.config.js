import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true // Garante que nunca tentará usar a porta 5173 do app principal
  }
});
