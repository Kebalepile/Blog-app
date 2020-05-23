import css from '../utils/Css.js'
import navbar from '../utils/Navbar.js'
import loading from '../utils/Loading.js'
import { searchForArticleX } from '../utils/Fetch.js'

const template = document.createElement('template'),
  url = new URL(location.href),
  params = new URLSearchParams(url.search)
class Article extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  tags({ title, keywords, description }) {
    document.head.querySelector('title').textContent = title
    document.head.querySelector('meta[name="keywords"]').content = keywords
    document.head.querySelector(
      'meta[name="description"]',
    ).content = description
  }
  display(data) {
    this.tags(data)
    let { title, body } = data,
      x = this.shadowRoot.querySelector('.loading')

    this.shadowRoot.removeChild(x)
    x = document.createElement('div')
    x.className = 'full-article'
    x.innerHTML = `
      <h1 class="article-title" >${title}</h1>
      <br/>
      <hr style=" width:70%; margin:auto; border:1px solid #222;"/>
      <br/>
      <section class="article-body">
      ${body}
      </section>
    `
    this.shadowRoot.appendChild(x)
  }
}

function load() {
  navbar()
  template.innerHTML = `
        ${css()}
        ${loading()}
  `

  const customElement = window.customElements.get('full-article'),
    x_article = document.createElement('full-article')

  if (typeof customElement === 'undefined') {
    window.customElements.define('full-article', Article)
    document.body.appendChild(x_article)
  } else {
    document.body.appendChild(x_article)
  }
  try {
    if (params.has('a')) {
      let x = document.querySelector('full-article')
      searchForArticleX(params.get('a')).then((data) => {
        x.display(data)
      })
    }
  } catch (err) {
    console.error(err.message)
  }
}
load()
