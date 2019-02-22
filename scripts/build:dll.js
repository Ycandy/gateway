'use strict'
 
const webpack = require('webpack')
const dllWebpackConfig = require('../build/webpack.config.dll')

webpack(dllWebpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
