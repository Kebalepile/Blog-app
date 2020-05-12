import navbar from '../utils/Navbar.js'
import css from '../utils/Css.js'
 import alert from '../utils/Alert.js'
navbar()
const template = document.createElement('template')
template.innerHTML = `
${css()}
  <div class="about">
    <section style="margin:auto; justify-content:center;">
      <div id="pp">
        <img src="#" loading="lazy" atl="keba's profile pic" width="100%" height="100%"/>
      </div>
      <div id="sub1">
         <form id="sub">
        <span>subscribe to (box) for new content</span>
        <section style="margin-top:5px;">
          <span>Name</span>
          <input type="text"
           required
           style="border:none; width:200px; height:25px;" />
        </section>
        
        <section style="margin-top:5px;">
          <span>Email</span>
          <input type="email"
          required
          style="border:none; width:200px; height:25px;" />
        </section>
        
        <input type="submit" value="Submit" 
        id="submit"
        style="width:80px; height:30px; border:none;
               cursor:pointer;margin-top:10px;color:white;
                background-color:green;"
         />
      </form>
      </div>
    </section>
    <br/>
    <hr style="background:black; border:none; height:1px;  margin:auto;"/>
    <br/>
    <p style="margin:auto; text-align:justify;">
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
  watch() {
    const form = this.shadowRoot.querySelector('form')

    form.onsubmit = (e) => {
      e.preventDefault()

      let submitBtn = this.shadowRoot.querySelector('#submit'),
        msg = {}
      submitBtn.disabled = true

      Array.from(e.target.elements).forEach((e) => {
        let type = e.attributes.type.value

        if (type.includes('email') || type.includes('text')) {
          msg[`${type}`] = e.value
          e.value = ''
        }
      })
      // send values to my email or  something
      // console.log(msg)
     
      alert(this.shadowRoot)
    }
  }
  connectedCallback() {
    console.log('about component mounted')
    this.watch()
  }
}
window.customElements.define('about-card', About)
document.body.appendChild(new About())
