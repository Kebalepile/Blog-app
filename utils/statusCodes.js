const { stringify } = require('./tools')

module.exports.kontinue = (res, msg) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 100
  res.end(stringify(msg))
}

module.exports.ok = (res, posts) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(
    stringify(
      posts === undefined ? { msg: 'no articles to display !' } : posts,
    ),
  )
}

module.exports.created = (res, error = undefined) => {
  if (error === undefined) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 201
    res.end(stringify({ msg: 'article publised', ok : true }))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 405
    res.end(
      stringify({
        error,
        msg: 'you did not do the thing, you know ... the thing thing',
      }),
    )
  }
}

module.exports.nocontent = (res) => {
  res.setHeader('Access-Control-Allow-Methods','POST')
  res.end()
}

module.exports.unauthorized = (res, xMsg) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 401
  res.end(stringify(xMsg))
}
module.exports.notModified = (res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 304
  res.end(stringify({ msg: "won't do that shit..." }))
}

module.exports.notFound = (res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 404
  res.end(stringify({ msg: 'whatever your looking for its not here...' }))
}

module.exports.internalServerError = (res, error) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 500
  res.end(stringify({ error, msg: "I'm hungry, let me hold a dollar" }))
}
