import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Eduardo San Martin Morote
  * @license MIT
  */`

const exportName = 'FocusTrapVue'
const defaultExternals = ['focus-trap']

function createEntry(
  {
    format, // Rollup format (iife, umd, cjs, es)
    external, // Rollup external option
    input = 'src/index.ts', // entry point
    env = 'development', // NODE_ENV variable
    minify = false,
    isBrowser = false, // produce a browser module version or not
  } = {
    input: 'src/index.ts',
    env: 'development',
    minify: false,
    isBrowser: false,
  }
) {
  // force production mode when minifying
  if (minify) env = 'production'

  external = external || defaultExternals

  const config = {
    input,
    plugins: [
      replace({
        __VERSION__: pkg.version,
        'process.env.NODE_ENV': `'${env}'`,
      }),
      alias({
        resolve: ['ts'],
      }),
      resolve(),
      commonjs(),
    ],
    output: {
      banner,
      file: 'dist/index.other.js',
      format,
    },
    external,
  }

  if (format === 'iife') {
    // config.input = 'src/entries/iife.ts'
    config.output.file = pkg.unpkg
    config.output.name = exportName
  } else if (format === 'es') {
    config.output.file = isBrowser ? pkg.browser : pkg.module
  } else if (format === 'cjs') {
    config.output.file = pkg.main
  }

  config.plugins.push(
    ts({
      // only check once, during the es version with browser (it includes external libs)
      check: format === 'es' && isBrowser && !minify,
      tsconfigOverride: {
        compilerOptions: {
          // same for d.ts files
          declaration: format === 'es' && isBrowser && !minify,
          module: 'esnext', // we need to override it because mocha requires this value to be commonjs
          target: format === 'iife' || format === 'cjs' ? 'es5' : 'esnext',
        },
      },
    })
  )

  if (minify) {
    config.plugins.push(
      terser({
        module: format === 'es',
        output: {
          preamble: banner,
        },
      })
    )
    config.output.file = config.output.file.replace(/\.js$/i, '.min.js')
  }

  return config
}

export default [
  // browser-friendly UMD build
  createEntry({ format: 'iife', external: [] }),
  createEntry({ format: 'iife', minify: true, external: [] }),
  createEntry({ format: 'cjs' }),
  createEntry({ format: 'es' }),
  createEntry({ format: 'es', isBrowser: true, external: [] }),
  createEntry({ format: 'es', isBrowser: true, minify: true, external: [] }),
]
