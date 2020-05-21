import css from './Css.js'

const template = document.createElement('template')
template.innerHTML = `${css()}
   <div id="auth">
     <form id="sub" style="margin:100px auto;background-color:#222;">
        <span>tokomane ya tlhokega</span>
        <section style="margin-top:5px;">
          <input type="password" required style="border:none; width:200px; height:25px;" />
        </section>
        <input type="submit" value="tswara" id="submit" style="width:80px; height:30px; border:none;cursor:pointer;margin-top:10px;color:white;background-color:orange;"/>
      </form>
   </div>
    `

export default function makeComponent(callBack) {
  try {
    class Auth extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
      watch() {
        const form = this.shadowRoot.querySelector('form')
        form.onsubmit = async (e) => {
          e.preventDefault()

          let x = e.target,
            sanitizeModule = await import('./Sanitize.js'),
            fetchModule = await import('./Fetch.js')
          x.elements[1].disabled = true
          Array.from(x.elements).forEach((e) => {
            let type = e.attributes.type.value

            if (type.includes('password')) {
              let value = sanitizeModule.toText(e.value).data
              // console.log(value)
              fetchModule.sign(value).then((ok) => {
                // console.log(ok)
                x.elements[1].disabled = false
                if (ok) {
                  e.value = ''
                  callBack(ok)
                } else {
                  e.value = ''
                  callBack(ok)
                }
              })
            }
          })
        }
      }

      connectedCallback() {
        this.watch()
      }
    }

    const customElement = window.customElements.get('auth-card')

    if (typeof customElement === 'undefined') {
      window.customElements.define('auth-card', Auth)
      document.body.appendChild(new Auth())
    } else {
      document.body.appendChild(new Auth())
    }
  } catch (err) {
    console.error(err)
  }
}
