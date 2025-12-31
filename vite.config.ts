import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Opciones del plugin
      svgrOptions: {
        icon: true, // Permite usar el SVG como icono
        // Remover todos los fills para que se puedan controlar con CSS
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke)',
              },
            },
          ],
        },
      },
    }),
  ],
})
