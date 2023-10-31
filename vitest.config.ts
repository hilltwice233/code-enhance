import {defineConfig} from "vitest/config"

export default defineConfig({
  // Enable vitest in-source test.
  test: {includeSource: ["{source,scripts}/**/*.ts"]},
})
