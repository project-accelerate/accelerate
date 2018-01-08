require('dotenv').config()

const { parse } = require('url')
const next = require('next')
const express = require('express')
const createBackend = require('./modules/api').default

const { PORT = 3000 } = process.env
const dev = process.env.NODE_ENV !== 'production'
const frontend = next({
  dev,
  dir: 'modules/frontend'
})

const render = (req, res) => {
  const { pathname, query } = parse(req.url)
  return frontend.render(req, res, pathname, query)
}

frontend.prepare().then(() => {
  const server = express()
  
  server.use(createBackend())
  server.get('*', render)

  server.listen(PORT)
})
