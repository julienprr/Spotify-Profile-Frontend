import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || getDefaultApiUrl(mode);
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __API_URL__: JSON.stringify(apiUrl),
    },
  };
});

function getDefaultApiUrl(mode: string): string {
  if (mode === 'dev') return 'https://dev.play-manager-api.julienprr.com';
  return 'https://play-manager-api.julienprr.com';
}
