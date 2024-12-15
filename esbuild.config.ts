import swc from '@swc/core'
import esbuild from 'esbuild'
import fs from 'fs'

esbuild.build({
  entryPoints: ['index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  logLevel: 'info',
  sourcemap: 'inline',
  treeShaking: true,
  minify: false,
  format: 'esm',
  target: 'esnext',
  external: ['@swc/helpers'],
  plugins: [
    {
      name: 'swc-loader',
      setup: (build) =>
        build.onLoad({ filter: /\.(ts)/ }, (args) => {
          if (args.path.includes('node_modules')) {
            return
          }

          const content = fs.readFileSync(args.path, 'utf-8')
          const { code } = swc.transformSync(content, {
            filename: args.path,
          })

          return {
            contents: code,
          }
        }),
    },
  ],
})
