import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  if (isDev) {
    // 开发模式配置
    return {
      plugins: [vue(), vueJsx(), vueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    }
  }

  // 构建模式配置
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'FluxUI',
        formats: ['es', 'cjs'],
        fileName: (format) => {
          return format === 'es' ? 'index.js' : 'index.cjs'
        },
      },
      rollupOptions: {
        external: ['vue', 'lucide-vue-next', '@fluxuijs/theme'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
            'lucide-vue-next': 'LucideVueNext',
            '@fluxuijs/theme': 'FluxUITheme',
          },
          assetFileNames: (assetInfo) => {
            // 只保留 CSS 文件
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'style.css'
            }
            // 跳过其他静态资源
            return '[name][extname]'
          },
        },
      },
      outDir: 'dist',
      emptyOutDir: true,
      cssCodeSplit: false,
      sourcemap: true,
      copyPublicDir: false,  // 不复制 public 目录
    },
  }
})
