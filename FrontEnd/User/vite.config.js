import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Replace with your repository name
  build: {
    outDir: 'User', // Ensure this matches your deployment directory
  },
});