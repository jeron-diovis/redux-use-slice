import { UserConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineVitestConfig(() => {
  const config = mergeConfig(
    viteConfig,
    defineVitestConfig({
      test: {
        globals: true,
        reporters: 'verbose',
      },
    })
  )
  return config as UserConfig
})
