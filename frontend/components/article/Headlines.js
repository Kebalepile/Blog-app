import publish from './Headline.js'

export default (articles) => {
  const headlines = document.createElement('section')
  headlines.setAttribute('id', 'headlines')

  document.body.appendChild(headlines)
  // sort by date before publishing
  articles.forEach((article) => {
    publish(article)
  })
}
