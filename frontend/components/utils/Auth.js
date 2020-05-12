import css from './Css.js'
// change css
const template = document.createElement('template')
template.innerHTML = `${css()}
 <div id="auth">
         <form id="sub" style="margin:100px auto;background-color:#222;">
        <span>tokomane ya tlhokega</span>
        <section style="margin-top:5px;">
          
          <input type="password"
           required
           style="border:none; width:200px; height:25px;" />
        </section>
        <input type="submit" value="tswara" 
        id="submit"
        style="width:80px; height:30px; border:none;
               cursor:pointer;margin-top:10px;color:white;
                background-color:orange;"
         />
      </form>
      </div>
    </section>`

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
        form.onsubmit = (e) => {
          e.preventDefault()
          Array.from(e.target.elements).forEach((e) => {
            let type = e.attributes.type.value

            if (type.includes('password')) {
              // check if key === database key, fetch key in database here
              switch (e.value) {
                case 'isy59NWY':
                  e.value = ''
                  callBack(true)
                  break
                case '#isy59NWY':
                  e.value = ''
                  callBack(true)
                  break
                default:
                  e.value = ''
                  callBack(false)
                  break
              }
            }
          })
        }
      }

      connectedCallback() {
        console.log('auth component mounted')
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

