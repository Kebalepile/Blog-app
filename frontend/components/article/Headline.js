import css from '../utils/Css.js'
const template = document.createElement('template')
class Headline extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
export default async ({ title, image, summary, id }) => {
  const url = new URL(`http://127.0.0.1:5500/article.html`)
  url.searchParams.set('a', id)

  template.innerHTML = `
  ${css()}
  <a href=${url} class="article">
    <div class="thumbnail">
    <img  src =${
      image || '#'
    } loading="lazy" alt="thumbnail" width="100%" height="100%"/>
  </div>
  <h1>${title}</h1>
  <p>${summary}</p>
  <p style="color:blue;">...read this article</p>
  </a>`

  const customElement = window.customElements.get('article-summary')

  if (typeof customElement === 'undefined') {
    window.customElements.define('article-summary', Headline)
    document.querySelector('#headlines').appendChild(new Headline())
  } else {
    document.querySelector('#headlines').appendChild(new Headline())
  }
}
