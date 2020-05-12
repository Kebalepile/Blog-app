import { populateStore } from './IndexedDB.js'
import headlines from '../article/Headlines.js'
import { getArticle_ } from './IndexedDB.js'

export async function getArticles() {
  try {
    let res = await fetch('http://127.0.0.1:3001/')
    console.table(res)
    if (res.ok && res.status == 200 && res.url === 'http://127.0.0.1:3001/') {
      res = await res.json()
      populateStore(res)
      headlines(res)
    } else {
      res = await res.json()
      throw `Error ==> ${res.alert}`
    }
  } catch (err) {
    console.error(err)
  }
}

export function getArticle(id, x_article) {
  try {
    getArticle_(id, x_article)
  } catch (err) {
    console.error(err.message)
  }
}

export async function searchByX(x_id) {
  try {
    let articles = await fetch(`http://127.0.0.1:3001/search?a=${x_id}`)
    articles = await articles.json()
    return articles
  } catch (err) {
    console.error(err.message)
  }
}

// export async function searchArticles(keyWords) {
//   try {
//     let articles = await fetch('http://127.0.0.1:3001/search', {
//       body: JSON.stringify(keyWords),
//     })
//     articles = await articles.json()
//     return articles
//   } catch (err) {
//     console.error(err.message)
//   }
// }
