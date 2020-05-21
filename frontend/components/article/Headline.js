import css from '../utils/Css.js'
const template = document.createElement('template')
class Headline extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
export default async ({ title, img, summary, id }) => {
  const url = new URL(`http://127.0.0.1:5500/article.html`)
  url.searchParams.set('a', id)
  // remove this line
 summary = document.createElement('section').innerHTML = summary
  template.innerHTML = `
  ${css()}
  <a href=${url} class="headline">
  <section class="thumbnail">
  <img  src=${
   img || '#'
  } loading="lazy" alt="thumbnail" width="100%" height="100%"/>
  </section>
  ${title}
  ${summary}
  <p style="color:blue;">...read full article</p>
  </a>`

  const customElement = window.customElements.get('headline-summary'),
  headlines =  document.querySelector('#headlines')
  if (typeof customElement === 'undefined') {
    window.customElements.define('headline-summary', Headline)
    headlines.appendChild(new Headline())
  } else {
    headlines.appendChild(new Headline())
  }
}
