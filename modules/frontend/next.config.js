require('dotenv').config({
  path: '../../.env'
})

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  distDir: '.build',

  webpack: (config) => ({
    ...config,

    plugins: [
      ...config.plugins || [],

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
  })
}
