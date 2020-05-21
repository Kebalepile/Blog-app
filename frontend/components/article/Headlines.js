import publish from './Headline.js'

export default (res) => {
  const headlines = document.querySelector('#headlines')
  headlines.removeChild(headlines.querySelector('.loading'))

  if (Array.isArray(res) && res.length > 0) {
    res.forEach((article) => {
      publish(article)
    })
  } else {
    let msg = document.createElement('div')
    msg.className = 'no-articles'
    msg.innerHTML = '<em>No articles to display</em>'

    headlines.appendChild(msg)
  }
}
