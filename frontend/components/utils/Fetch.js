import { populateStore, findArticle, allArticles } from './IndexedDB.js'
import headlines from '../article/Headlines.js'

export function getArticles() {
  const xDatabase = async () => {
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
    } catch (err) {}
  }
  allArticles((x_articles) => {
    switch (x_articles.length) {
      case 0:
        xDatabase()
        break
      default:
        headlines(x_articles)
        break
    }
  })
}

export function getArticle(id, x_article) {
  try {
    findArticle(id, x_article)
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
