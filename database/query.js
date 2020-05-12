const posts = require('./articles.json')
const { parse } = require('../utils/tools')

module.exports.articles = async () => {
  return posts
}

module.exports.article = async (id) => {
  let articles = posts.filter((element) => element.id === id)
  return articles
}

module.exports.upload = async (article) => {
  // add to database
  // return boolean if successful
}
