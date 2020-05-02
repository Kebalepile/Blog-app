import publish from './Article.js'

export default (articles) => {
  articles.forEach((article) => {
    publish(article)
  })
}
