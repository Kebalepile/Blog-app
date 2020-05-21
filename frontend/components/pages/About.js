import navbar from '../utils/Navbar.js'
import css from '../utils/Css.js'

// add real content and image url
navbar()
const template = document.createElement('template')
template.innerHTML = `
${css()}
  <div class="about">
    <section style="margin:auto; justify-content:center;">
      <div id="pp">
        <img src="#" loading="lazy" atl="keba's profile pic" width="100%" height="100%"/>
      </div>
    </section>
    <br/>
    <hr style="background:black; border:none; height:1px;  margin:auto;"/>
    <br/>
    <p style="margin:auto; text-align:left; background-color:#0222; padding:5px;">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
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
