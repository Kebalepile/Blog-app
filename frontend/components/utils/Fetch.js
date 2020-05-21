
import headlines from '../article/Headlines.js'

export async function articles() {
  
    try {
      let res = await fetch('http://127.0.0.1:3001/')
      if (res.ok && res.status === 200) {
        res = await res.json()
        headlines(res)
      } 
    } catch (err) {
      console.error(err)
    }
}

export async function  searchForArticleX(x_id) {
  try {
    let res = await fetch(`http://127.0.0.1:3001/search?a=${x_id}`)

    if (res.ok && res.status === 200) {
      res = await res.json()
      return res
    } else {
      res = await res.json()
      throw new Error(`Error ===> ${res.msg}`)
    }
  } catch (err) {
    console.error(err.message)
  }
}

export async function sign(pwd) {
  let opt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pwd }),
  }

  try {
    let res = await fetch(`http://127.0.0.1:3001/kookiefy`, opt),
    token = res.headers.get('x-tuuken')
    res = await res.json()
    return { access: res.continue, token }
  } catch (err) {
    console.error(err)
  }
}

export async function upload(article, xToken) {
  let opt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xSigned':xToken
    },
    body: JSON.stringify(article),
  }
  try {
    let res = await fetch(`http://127.0.0.1:3001/upload`, opt)
    res = await res.json()
    return res
  } catch (err) {
    console.error(err.message)
  }
}

