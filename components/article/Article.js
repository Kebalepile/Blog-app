import css from '../utils/Css.js'
const template = document.createElement('template')
class Article extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
export default async ({ title, image, summary, url }) => {
  template.innerHTML = `
  ${css()}
  <a href=${url} class="article">
    <div class="thumbnail">
    <img  src =${image || '#'} loading="lazy" alt="thumbnail" width="100%" height="100%"/>
  </div>
  <h1>${title}</h1>
  <p>${summary}</p>
  <p style="color:blue;">...read this article</p>
  </a>`

  const customElement = window.customElements.get('article-summary')

  if (typeof customElement === 'undefined') {
    window.customElements.define('article-summary', Article)
    document.querySelector('#articles').appendChild(new Article())
  } else {
    document.querySelector('#articles').appendChild(new Article())
  }
}
