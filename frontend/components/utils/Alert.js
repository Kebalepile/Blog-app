import css from './Css.js'
export default function makeAlert(component) {
  try {
    const template = document.createElement('template')
    template.innerHTML = `${css()}
        <div class="alert">
             <div class="header">
                Alert 
             </div>

             <br/>
             <br/>

             <div class="tick">
              <img src=${
                './components/utils/icons8_ok_480px.jpg' || '#'
              } alt='alert image' width="20px"; height="20px";/>
              Message sent
             </div>
           
            <div class="btns">
                <button class="btn">OK</button>
                <button class="btn btn2">Cancel</button>
            </div>
             
        </div>`

    class Alert extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
      watch() {
        let buttons = this.shadowRoot.querySelectorAll('.btn')

        buttons = [...buttons]
        buttons.forEach((btn) => {
          btn.onclick = (e) => {
            const submitBtn = component.querySelector('#submit'),
              alert = component.childNodes[4]

            component.removeChild(alert)
            submitBtn.disabled = false
            location.reload()
          }
        })
      }
      connectedCallback() {
        this.watch()
      }
    }

    const customElement = window.customElements.get('alert-sent')

    if (typeof customElement === 'undefined') {
      window.customElements.define('alert-sent', Alert)

      component.appendChild(new Alert())
    } else {
      component.appendChild(new Alert())
    }
  } catch (err) {
    console.error(err)
  }
}
