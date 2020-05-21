import css from './Css.js'

export default function createComponent() {
  try {
    const template = document.createElement('template')
    template.innerHTML = `
${css()}
<form class="searchbar" spellcheck="true" >
    <input type="submit" value="Find" />
    <input type="search" 
    placeholder=" Find article by title e.g 'Blockchain'" 
    required />
</form>`
    class Searchbar extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
      watch() {
        const form = this.shadowRoot.querySelector('.searchbar')

        form.onsubmit = async (e) => {
          e.preventDefault()

          let x = e.target.elements,
            val = await x[1].value,
            module = await import('./Sanitize.js'),
            text = module.toText(val)

          // use text.data
          x[1].value = ''
          x[0].blur()
        }
      }
      connectedCallback() {
        this.watch()
      }
    }

    window.customElements.define('search-bar', Searchbar)
    document.body.appendChild(new Searchbar())
  } catch (err) {
    alert(
      "Browser your using does not support, (keba's blog version), please use different browser",
    )
  }
}
