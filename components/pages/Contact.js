import navbar from '../utils/Navbar.js'
import css from '../utils/Css.js'

navbar()
const template = document.createElement('template')
template.innerHTML = `
${css()}
<article class="contact-card">
<h1><ul>Contacts</ul></h1>
<br/>
<p>
    I'd like to hear from you! What concepts are you learning right now,
    which learning strategies are you using to learn it?
    <br/>
    <br/>
    Email me at: kmotshoana@gmail.com
    <br/>
    Follow me on Telegram : @keba
    <br/>
    Follow me on Twitter: @trickdaddy   
</p>
</article>`

class Contact extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    console.log('contact component mounteded')
  }
}

window.customElements.define('contact-card', Contact)
document.body.appendChild(new Contact())
