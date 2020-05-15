import css from '../utils/Css.js'
import navbar from '../utils/Navbar.js'
import { getArticle, searchByX } from '../utils/Fetch.js'

const template = document.createElement('template'),
  url = new URL(location.href),
  params = new URLSearchParams(url.search)
class Article extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  _article(data) {
    let { title, body } = data,
      x = this.shadowRoot.querySelector('h3')

    this.shadowRoot.removeChild(x)
    x = document.createElement('div')
    x.className = 'full-content'
    x.innerHTML = `
      <div class="full-content">
        <h1><ul>${title} </ul></h1>
        <br/>
        <br/>
        <section class="content">
        ${body}
        </section>
        </div>`
    this.shadowRoot.appendChild(x)
  }
  display(data) {
    switch (data) {
      case undefined:
        const params = new URLSearchParams(url.search)
        if (params.has('a')) {
          searchByX(params.get('a')).then((data) => {
            this._article(data)
          })
        }
        break
      default:
        this._article(data)
        break
    }
  }
}

function load() {
  navbar()
  template.innerHTML = `
        ${css()}
        <h3> ...loading </h3>
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
      getArticle(params.get('a'), (x_res) => {
        x.display(x_res)
      })
    }
  } catch (err) {
    console.error(err.message)
  }
}
load()
