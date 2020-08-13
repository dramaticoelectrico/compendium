const { src, dest, series } = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const cleanCSS = require('gulp-clean-css')
const path = require('path')

function processCss() {
  return src('public/styles/*.css')
    .pipe(cleanCSS({ compatibility: { opacity: true } }))
    .pipe(dest(path.join(__dirname, 'dist/styles')))
}
function processJs() {
  return src('public/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(dest(path.join(__dirname, 'dist/js')))
}
exports.processJs = processJs
exports.processCss = processCss
exports.default = series(processJs, processCss)
