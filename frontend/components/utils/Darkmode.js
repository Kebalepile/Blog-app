import css from './Css.js'
export default function createComponent() {
  try {
    const template = document.createElement('template')
    template.innerHTML = `
      ${css()}
      <legend for="mode" id="darkmode" title="Dark mode coming soon...">
          <input type="checkbox" id="mode" />
            <span>Dark mode</span>
        </legend>
`

    class Darkmode extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
      watch() {
        const checked = this.shadowRoot.querySelector('#mode')
        checked.onchange = (e) => {
          console.log(e.target.checked)
        }
      }
      connectedCallback() {
        this.watch()
      }
    }

    window.customElements.define('dark-mode', Darkmode)
    document.body.appendChild(new Darkmode())
  } catch (err) {
    alert(
      "Browser your using does not support, (keba's blog version), please use different browser",
    )
  }
}
