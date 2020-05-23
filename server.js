const http = require('http'),
  port = 3001
  router = require('./router/switchboard.js')
  // let {deleteAll} = require("./database/queryDB.js")
  // deleteAll('articles')
  http.createServer(router)
  .listen(port, console.log(`server listening on http://127.0.0.1:${port}/`))
