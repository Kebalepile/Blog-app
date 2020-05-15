require('dotenv').config()

const { certify, certified } = require('../utils/token'),
  urlParser = require('url').parse,
  { nanoid } = require('nanoid'),
  { pass, parse, stringify, hash, match } = require('../utils/tools'),
  { articles, article, upload } = require('../database/queryDB'),
  {
    ok,
    created,
    unauthorized,
    notFound,
    internalServerError,
  } = require('../utils/statusCodes')

module.exports = async (req, res) => {
  const pathname = urlParser(req.url, true).pathname

  try {
    // only allow frontend to use this api in production
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    console.log(pathname)
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
        if (pass({ req, method: 'post' })) {
          let new_article = []
          req.on('data', (chunk) => {
            new_article.push(chunk)
          })
          req.on('end', async () => {
            try {
              let token = req.getHeader('x-tuuken'),
                authorized = await certified(token)

              if (authorized) {
                new_article = parse(new_article)
                upload(new_article)
                  .then((saved) => {
                    if (saved) {
                      created(res)
                    } else {
                      throw 'internal server error'
                    }
                  })
                  .catch((err) => {
                    internalServerError(res, err.message)
                  })
              } else {
                throw 'Bitch please !!!'
              }
            } catch (err) {
              internalServerError(res, err.message)
            }
          })
          break
        }
        notFound(res)
        break
      case '/kookiefy':
        if (pass({ req, method: 'get' })) {
          let data = []
          req.on('data', (chunk) => {
            data.push(chunk)
          })
          req.on('end', async () => {
            data = await parse(data)
            // call database to return hased loggin passwords

            let secret = 'stone to the bone',
              passwords = ['#isy59NWY#', '#0670isy$23moth#']
            pwdMatched = passwords.map((pwd, idx) => {
              let res = match(pwd, data[idx])
              return res
            })

            if (pwdMatched[0] === true && pwdMatched[1] === true) {
              // arrary of pwd's encrypted with secret
              // let token = await cerfity(passwords)
              // res.setHeader('x-tuuken', stringify(token))
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
