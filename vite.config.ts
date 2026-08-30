/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite + Vitest para el proyecto TaskFlow IA
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
