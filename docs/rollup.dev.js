const Glob = require('Glob');
const path = require('path');
const postcssPlugin = require('rollup-plugin-postcss');
const babelPlugin = require('rollup-plugin-babel');
const jsonPlugin = require('@rollup/plugin-json');
const urlPlugin = require('@rollup/plugin-url');
const resolvePlugin = require('@rollup/plugin-node-resolve');
const commonjsPlugin = require('@rollup/plugin-commonjs');
const cssPlugin = require('rollup-plugin-css-only');
const htmlPlugin = require('rollup-plugin-html2');

const getPages = (globs, format) => {
  let pages = []
  Glob.sync(globs).forEach(_path => { // src/module/login/win.js
    let extname = path.extname(_path) // .js
    let basename = path.basename(_path, extname) // win
    let pathname = path.dirname(_path) // src/module/login
    pages.push({
      input: _path,
      extname,
      basename,
      pathname
    })
  })
  return pages
}

let xx = getPages('src/{app,module,tablayout,auth}/**/*.js').map(page => {
  let { input, pathname, basename, extname } = page
  let config = {
    input,
    // inlineDynamicImports: true,
    output: {
      // dir: `html/${pathname.split('/').reverse()[0]}/`,
      file: `html/${pathname.split('/').reverse()[0]}/${basename}${extname}`,
      format: 'esm', // cjs esm iife amd umd system
      // name: basename
    },
    watch: {
      // include: `${pathname}/${basename}.*`,
      // include: 'src/**/*.*',
      exclude: 'node_modules/**,html/**'
    },
    plugins: [
      commonjsPlugin(),
      resolvePlugin(),
      jsonPlugin(),
      urlPlugin({
        emitFiles: false,
        publicPath: 'image/',
        fileName: '[name][extname]', // [hash]
        limit: 14336 // (14kb)
      }),
      postcssPlugin({
        modules: false,
        sourceMap: false,
        extract: true,
        // extract: `html/${pathname.split('/').reverse()[0]}/${basename}.css`,
        // inject: true,
      }),
      babelPlugin({
        exclude: 'node_modules/**'
      }),
      htmlPlugin({
        template: `${pathname}/${basename}.html`,
        // dest: `html/${pathname.split('/').reverse()[0]}/`, //${basename}${extname}
        fileName: `${basename}.html`,
        onlinePath: '.',
      })
    ]
  }
  return config
})


export default xx
