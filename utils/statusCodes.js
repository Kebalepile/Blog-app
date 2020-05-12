const { stringify } = require('./tools')
// sets response code 200 and returns obj if needs to be returned
module.exports.ok = (res, posts) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(
    stringify(
      posts === undefined ? { response: 'no articles to display !' } : posts,
    ),
  )
}

// sets response code to 201 and returns obj
module.exports.created = (res, error = undefined) => {
  if (error === undefined) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 201
    res.end(stringify({ alert: 'article publised' }))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 405
    res.end(stringify({ error }))
  }
}

module.exports.unauthorized = (res, xaddress) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 401
  res.end(stringify({ error: `${xaddress} is not authorized` }))
}
module.exports.notModified = (res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 304
  res.end()
}
// sets response code to 404 to client, to display nice 404 page
module.exports.notFound = (res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 404
  res.end(stringify({ alert: 'whatever your looking for its not here...' }))
}

module.exports.internalServerError = (res, error) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 500
  res.end(stringify({ error }))
}
