import { defineConfig } from 'vitest/config'
import { commonConfig } from './vitest.config'

export default defineConfig({
  ...commonConfig,
  test: {
    ...commonConfig.test,
    fileParallelism: true,
    include: ['src/**/*.test.ts'],
  },
})
