import navbar from '../utils/Navbar.js'
import css from '../utils/Css.js'

navbar()
const template = document.createElement('template')
template.innerHTML = `
${css()}
  <div class="about">
    <section style="margin:auto; justify-content:center;">
      <div id="pp">
        <img src="../../images/sunset.jpg" 
        loading="lazy" atl="image by johannes plenio on unsplash.com"
        title="Image by johannes plenio on unsplash.com" width="100%" height="100%"/>
      </div>
    </section>
    <br/>
    <hr style="background:black; border:none; height:1px;  margin:auto;"/>
    <br/>
    <p style="margin:auto; text-align:left; background-color: #fcfcfc; padding:5px;">
    &#9995;&#127997; Hi there <br/><br/>
     My Name is <strong>Keba</strong>, I live in South Africa, North West.
      <br/><br/>
       I'm a application programmer, I write software that lets users interact the computer, I specialize in 
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
