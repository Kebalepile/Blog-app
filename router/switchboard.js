const assert = require('assert'),
  { parse } = require('url'),
  { pass } = require('../utils/tools'),
  { articles, article, upload } = require('../database/query.js'),
  {
    ok,
    created,
    notModified,
    unauthorized,
    notFound,
    internalServerError,
  } = require('../utils/statusCodes')

module.exports = async (req, res) => {

  const pathname = parse(req.url, true).pathname

  try {
    // only allow frontend to use this api in production
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    switch (pathname) {
      case '/':
        if (pass({ req, method: 'get' })) {
          articles()
            .then((data) => {
              ok(res, data)
            })
            .catch((err) => {
              console.error(err.message)
              internalServerError(res, err.message)
            })

          break
        }
        notFound(res)
        break
      case '/search':
        if (pass({ req, method: 'get' })) {
          const queryObject = parse(req.url, true).query

          article(queryObject.a)
            .then((data) => {
              if (data.length > 0) {
                ok(res, data)
              } else {
                notFound(res)
              }
            })
            .catch((err) => {
              internalServerError(res, err.message)
            })
        }
        break
      case '/upload':
        if (pass({ req, method: 'post' })) {
          let new_article = []
          req.on('data', (chunk) => {
            new_article.push(chunk)
          })
          req.on('end', async () => {
            try {
              upload(new_article)
                .then((saved) => {
                  if(saved){
                    created(res)
                  }else{
                    throw "internal server error"
                  }
                })
                .catch((err) => {
                  internalServerError(res, err.message)
                })
            } catch (err) {
              internalServerError(res, err.message)
            }
          })
          break
        }
        notFound(res)
        break
      default:
        notFound(res)
        break
    }
  } catch (err) {
    internalServerError(res, err.message)
  }
}
