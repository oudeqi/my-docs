
const { series, parallel, watch, src, dest } = require('gulp');
const del = require('delete');
const rollup = require('rollup');
const postcss = require('gulp-postcss');
const inlinesource = require('gulp-inline-source');
const flatten = require('gulp-flatten');
const gulpif = require('gulp-if');
const { getEntrance, getPages } = require('./rollup.config.js');
const eslint = require('gulp-eslint');

const postcssPlugin = require('rollup-plugin-postcss');
const babelPlugin = require('rollup-plugin-babel');
const jsonPlugin = require('@rollup/plugin-json');
const urlPlugin = require('@rollup/plugin-url');
const resolvePlugin = require('@rollup/plugin-node-resolve');
const commonjsPlugin = require('@rollup/plugin-commonjs');
const htmlPlugin = require('rollup-plugin-bundle-html');
const cssPlugin = require('rollup-plugin-css-only')
// const htmlPlugin = require('@rollup/plugin-html');

// 配置需要处理的文件目录和转码之后文件的存放目录
const eslintConfig = {
  source: 'src/**/*.js',
  dest: 'build',
}

function lint () {
  return src(['src/**/*.js', '!node_modules/**'])
  .pipe(eslint())
  // .pipe(eslint.result(result => {
  //   console.log(`ESLint result: ${result.filePath}`);
  //   console.log(`# Messages: ${result.messages.length}`);
  //   console.log(`# Warnings: ${result.warningCount}`);
  //   console.log(`# Errors: ${result.errorCount}`);
  // }))
  .pipe(eslint.format())
  // .pipe(eslint.failOnError())
}

function clean(cb) {
  del(['html/**/*', './index.html', './index.js'], cb)
}

function javascript() {
  return Promise.all(
    // {module,tablayout,auth}
    getPages('src/auth/**/*.js').map(page => {

      // pages.push({
      //   input: _path,
      //   output: { // html/login/win.js
      //     file: `html/${pathname.split('/').reverse()[0]}/${basename}${extname}`,
      //     format: format || 'esm', // cjs esm iife amd umd system
      //     name: 'fn'
      //   },
      //   plugins
      // })
      let { input, pathname, basename, extname } = page
      console.log({
        template: `${pathname}/${basename}.html`,
        dest: `html/${pathname.split('/').reverse()[0]}`,
        filename: `${basename}.html`
      })
      let config = { // @babel/plugin-syntax-dynamic-import
        input,
        inlineDynamicImports: true,
        output: {
          dir: `html/${pathname.split('/').reverse()[0]}/`,
          // file: `html/${pathname.split('/').reverse()[0]}/${basename}${extname}`,
          format: 'esm', // cjs esm iife amd umd system
          // name: 'fn'
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
            inject: true,
          }),
          babelPlugin({
            exclude: 'node_modules/**'
          }),
          cssPlugin({ output: `html/${pathname.split('/').reverse()[0]}/${basename}.css` })
          // ,
          // htmlPlugin({
          //   template: `${pathname}/${basename}.html`,
          //   dest: `html/${pathname.split('/').reverse()[0]}/${basename}${extname}`,
          //   filename: `${basename}.html`
          // })
        ]
      }
      return rollup.rollup(config).then(bundle => bundle.write(config.output))
    })
  )
}

function css() {
  return src([
    'src/module/**/*.css',
    'src/tablayout/**/*.css',
    'src/auth/**/*.css'
  ])
  .pipe(postcss())
  // .pipe(flatten({ // 这里/**/*匹配上的路径和想要的路径刚好一致，所以可以不用插件
  //   newPath: '', // 在/**/*匹配的path前增加的路径，默认为''。
  //   includeParents: -1
  //   // 在"/**/*"匹配的path中，保留的父级目录数量。
  //   // 0不保留，1从路径左边开始保留一级，-1从路径右边开始保留一级。
  //   // [1, 1]路径的左边、右边分别保留一级
  // }))
  .pipe(dest('html/'))
}

function appcss() {
  return src('src/app.css')
  .pipe(postcss())
  .pipe(dest('css/'))
}

function html () {
  return src([
    'src/module/**/*.html',
    'src/tablayout/**/*.html',
    'src/auth/**/*.html',
  ])
  .pipe(dest('html/'))
}

function entranceHTML (cb) {
  return src('src/app/index.html')
  // .pipe(flatten()) // 有 /**/* 匹配的时候，flatten才有用
  // .pipe(inlinesource())
  .pipe(dest('./'))
}

async function entranceJS () {
  const entrance = getEntrance('src/app/index.js')
  const bundle = await rollup.rollup(entrance)
  return await bundle.write(entrance.output)
}

function delEntranceJS (cb) {
  del(['./index.js'], cb)
}

function watchAll () {
  watch('src/**',
    parallel(
      // html,
      // css,
      javascript,
      // appcss,
      // entranceJS,
      // entranceHTML
    )
  ).on('all', (eventName, path) => {
    console.log(`${eventName} >>> ${path}`)
  })
}

exports.test = series(clean, parallel(css, javascript))
exports.default = series(clean)

// process.env.NODE_ENV === 'production'
