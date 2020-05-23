import navbar from '../utils/Navbar.js'
import css from '../utils/Css.js'

navbar()
const template = document.createElement('template')
template.innerHTML = `
${css()}
  <div class="about">
    <section style="margin:auto; justify-content:center;">
      <div id="pp">
        <img src="https://images.unsplash.com/photo-1565441966206-6fcfda1c29dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60" loading="lazy" atl="keba's profile pic" width="100%" height="100%"/>
      </div>
    </section>
    <br/>
    <hr style="background:black; border:none; height:1px;  margin:auto;"/>
    <br/>
    <p style="margin:auto; text-align:left; background-color: #fcfcfc; padding:5px;">
    &#9995;&#127997; Hi there <br/><br/>
     my name is <strong>Keba</strong>, I live in South Africa, North West.
      <br/><br/>
       I am a developer, i specialize in 
     <strong> Web development </strong> and <strong>Blockchain development</strong>,
      <strong>full-stack certified </strong> &#128293; in both fields, if you want to know more about me feel free to <a href="/contact.html">contact</a> me.
     <br/>
    ...ooh I also write <a href="/">articles </a> on various topics  &#9996;&#127997;
    </p>
  </div>`

class About extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
window.customElements.define('about-card', About)
document.body.appendChild(new About())
