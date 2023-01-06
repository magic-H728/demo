import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    server: {
        // open: true,
        host: '0.0.0.0',
        port: 80,
        proxy: {
            '/api': {
                // target: "http://localhost:5555",
                target:"https://api.magic-h.top/",
                changeOrigin: true,
                secure: false,
                rewrite (path) {
                    return path.replace(/^\/api/, '')
                }
            }
        }
    },
    preview: {
        port: 80,
    }
})
