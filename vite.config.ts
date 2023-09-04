import { defineConfig } from 'vite'
import babel from '@rollup/plugin-babel'
import ResolveType from '@vue/babel-plugin-resolve-type'
import jsx from '@vue/babel-plugin-jsx'

const babelPlugin = babel({
  extensions: ['.ts', '.tsx'],
  babelHelpers: 'bundled',
  plugins: [jsx, ResolveType]
})
// @ts-ignore
babelPlugin.enforce = 'pre'

export default defineConfig({
  esbuild: {
    jsx: 'preserve'
  },
  build: {
    minify: false
  },
  plugins: [babelPlugin]
})
