const next = require('next')
const express = require('express')
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on ${process.env.CLIENT_URL || `http://localhost:${port}`}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})