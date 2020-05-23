import css from '../utils/Css.js'
import navbar from '../utils/Navbar.js'
import auth from '../utils/Auth.js'
// change localhost domain to real domain
const template = document.createElement('template')

class Kwala extends HTMLElement {
  constructor(token) {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.token = token
  }
  connectedCallback() {
    this.watch()
  }

  watch() {
    const form = this.shadowRoot.querySelector('form'),
      names = ['body', 'summary', 'title', 'keywords', 'description', 'image'],
      article = {}

    form.onsubmit = async (e) => {
      e.preventDefault()

      const x = e.target.elements,
        sanitizeModule = await import('../utils/Sanitize.js')

      article.body = sanitizeModule.toText(x.body.value).data
      article.summary = sanitizeModule.toText(x.summary.value).data
      article.title = sanitizeModule.toText(x.title.value).data
      article.img = sanitizeModule.toText(x.image.value).data
      article.keywords = sanitizeModule.toText(x.keywords.value).data
      article.description = sanitizeModule.toText(x.description.value).data

      Array.from(x).forEach((element) => {
        if (names.includes(element.name)) {
          element.value = ''
        }
      })

      this.toHtml(article)
    }
  }
  async toHtml({ body, summary, title, img, keywords, description }) {
    const md = new Remarkable('full', {
        html: true,
        typographer: true,
      }),
      mdToHtml = (markdown) => md.render(markdown)

    try {
      summary = mdToHtml(summary)
      body = mdToHtml(body)
      let dateModule = await import ('../utils/Date.js'),
      date = dateModule.date(),
       article = {
        title,
        keywords,
        description,
        summary,
        img,
        body,
        date
      }

      const fetchModule = await import('../utils/Fetch.js')
      fetchModule.upload(article, this.token).then((res) => {
        if (res.ok) {
          location.assign('http://127.0.0.1:5500/')
        }
      })
    } catch (err) {
      console.error(err.message)
    }
  }
}
function writeContent(token) {
  navbar()

  template.innerHTML = `
  ${css()}
  <form id="publish">
   <h1>Article </h1>
      <textarea  name="body" required  id="article-body" ></textarea>
    <h3>Article summary</h3>
    <textarea name="summary" required id="article-summary"></textarea>
    
    <h3>description</h3>
    <textarea name="description" required id="article-description"></textarea>
    <div>
        Artice title <input type="text"  name="title" required id="article-title" />
    </div>
    <div>
        keywords <input type="text"  name="keywords" required id="article-keywords" />
    </div>
    <div >
       add image 
       <input type="url"  placeholder="   image url" pattern="https://.*" required  name="image" id="article-img" />
    </div>
    <input type="submit" value="Post Article" style="cursor:pointer;" />
  </form>`

  try {
    const customElement = window.customElements.get('full-kwala')

    if (typeof customElement === 'undefined') {
      window.customElements.define('full-kwala', Kwala)
      document.body.appendChild(new Kwala(token))
    } else {
      document.body.appendChild(new Kwala(token))
    }
  } catch (err) {
    console.error(err.message)
  }
}

function isAllowed() {
  auth((x) => {
    document.body.removeChild(document.querySelector('auth-card'))
    if (x.access) {
      writeContent(x.token)
    } else {
      location.assign('http://127.0.0.1:5500/')
    }
  })
}

isAllowed()
