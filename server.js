require('dotenv').config()
require('babel-polyfill')

const express = require('express')
const { createBackend } = require('./modules/api')
const { frontend, render } = require('./modules/frontend')

const { PORT = 3000 } = process.env

frontend.prepare().then(() => {
  const server = express()
  
  server.use(createBackend())
  server.get('*', render)

  server.listen(PORT)
})
