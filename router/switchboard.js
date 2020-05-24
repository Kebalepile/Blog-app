const urlParser = require('url').parse,
  { sign, verify } = require('../utils/token'),
  { nanoid } = require('nanoid'),
  { pass, parse, match } = require('../utils/tools'),
  { articles, article, upload, credentials } = require('../database/queryDB'),
  {
    ok,
    created,
    nocontent,
    unauthorized,
    notFound,
    internalServerError,
  } = require('../utils/statusCodes')

module.exports = async (req, res) => {
  const pathname = urlParser(req.url, true).pathname
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')

  try {
    switch (pathname) {
      case '/':
        if (pass({ req, method: 'get' })) {
          articles()
            .then((data) => {
              ok(res, data)
            })
            .catch((err) => {
              internalServerError(res, err.message)
            })
          break
        }
        notFound(res)
        break
      case '/search':
        if (pass({ req, method: 'get' })) {
          const queryObject = urlParser(req.url, true).query
          article(queryObject.a)
            .then((data) => {
              if (data.id === queryObject.a) {
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
        if (pass({ req, method: 'options' })) {
          res.setHeader('Access-Control-Max-Age', '300')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type,xSigned')
          nocontent(res)
        } else if (pass({ req, method: 'post' })) {
          let new_article = []
          req.on('data', (chunk) => {
            new_article.push(chunk)
          })
          req.on('end', async () => {
            try {
              if (req.complete) {
                let token = req.headers['xsigned'],
                  authorized = await verify(token)

                if (authorized) {
                  new_article = await parse(new_article)
                  new_article.id = nanoid()
                  let saved = await upload(new_article)
                  if (saved) {
                    created(res)
                  } else {
                    throw 'internal server error'
                  }
                } else {
                  throw 'internal server error'
                }
              } else {
                throw 'internal server error'
              }
            } catch (err) {
              internalServerError(res, err)
            }
          })
          break
        }
        notFound(res)
        break
      case '/kookiefy':
        if (pass({ req, method: 'options' })) {
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          nocontent(res)
        } else if (pass({ req, method: 'post' })) {
          let data = []

          req.on('data', (chunk) => {
            data.push(chunk)
          })
          req.on('end', async () => {
            try {
              if (req.complete) {
                data = await parse(data)

                let pwd = await credentials(),
                  matched = await match(pwd, data.pwd)

                if (matched) {
                  let token = await sign()

                  res.setHeader('Access-Control-Expose-Headers', 'x-tuuken')
                  res.setHeader('x-tuuken', token)

                  ok(res, { continue: true })
                } else {
                  unauthorized(res, { msg: 'unauthorized demand' })
                }
              } else {
                throw 'internal server error'
              }
            } catch (err) {
              
            }
          })
        }
        break
      default:
        notFound(res)
        break
    }
  } catch (err) {
    internalServerError(res, err.message)
  }
}
