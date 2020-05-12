import css from './Css.js'
export default function createComponent() {
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
    }

    const customElement = window.customElements.get('nav-bar'),
      navBar = document.createElement('nav-bar')

    if (typeof customElement === 'undefined') {
      window.customElements.define('nav-bar', Navbar)
      document.body.appendChild(navBar)
    } else {
      document.body.appendChild(navBar)
    }
  } catch (err) {
    alert(
      "Browser your using does not support, (keba's blog version), please use different browser",
    )
  }
}

