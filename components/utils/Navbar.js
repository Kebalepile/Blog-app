import css from './Css.js'

function createComponent() {
  try {
    const template = document.createElement('template')
    template.innerHTML = `
${css()}
     <ul class="navbar">
          <li><a class="nav-a" href="./about.html">about</a></li>
          <li><a class="nav-a" href="./contact.html">contact</a></li>
          <li><a class="nav-a" href="/">articles</a></li>
      </ul>`

    class Navbar extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
      connectedCallback() {
        console.log('mothertrucker navbar in the route')
      }
    }

    window.customElements.define('nav-bar', Navbar)
    document.body.appendChild(new Navbar())
  } catch (err) {
    alert(
      "Browser your using does not support, (keba's blog version), please use different browser",
    )
  }
}
export default () => {
  createComponent()
}
