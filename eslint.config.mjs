import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/node_modules/**', '**/.pnpm-store/**', '**/dist/**'],
  markdown: false,
  modules: false,
  rules: {
    curly: ['error', 'all'],
  },
})
