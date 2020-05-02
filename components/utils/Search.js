import css from './Css.js'

function createComponent() {
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

        form.onsubmit = (e) => {
          e.preventDefault()
          let val = e.target.elements[1].value
          console.log(val)
          e.target.elements[1].value = ''
          e.target.elements[0].blur()
        }
      }
      connectedCallback() {
        console.log('mothertrucker searchbar in the route')
        this.watch()
      }
      disconnectedCallback() {
        console.log('bitch bye')
      }
      attributeChangedCallback(attributeName, oldVal, newVal) {}
    }

    window.customElements.define('search-bar', Searchbar)
    document.body.appendChild(new Searchbar())
  } catch (err) {
    alert(
      "Browser your using does not support, (keba's blog version), please use different browser",
    )
  }
}
export default () => {
  createComponent()
}
