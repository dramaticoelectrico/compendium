const express = require('express')
const fs = require('fs')
const app = express()

const rootDir = require('./path')
const styles = fs.readFileSync(
  rootDir +
    `${
      app.get('env') === 'development' ? '/public/' : '/dist/'
    }styles/global.css`,
  'utf8'
)

module.exports.globalCSS = styles
