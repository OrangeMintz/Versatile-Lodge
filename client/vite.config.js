import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/uploads': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },

            '/uploads': {
                target: 'http://192.168.8.69:8000',
                changeOrigin: true,
            },

            '/dad-joke': {
                target: 'https://icanhazdadjoke.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dad-joke/, ''),
                headers: {
                    'Accept': 'application/json',
                },
            },
        },
    },
});
