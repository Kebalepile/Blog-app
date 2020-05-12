import css from '../utils/Css.js'
import navbar from '../utils/Navbar.js'
import auth from '../utils/Auth.js'

const template = document.createElement('template')

class Kwala extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  createImage(files, callback) {
    let allowed = /\.jpeg|\.jpg|\.png$/,
      types = ['image/jpeg', 'image/jpg', 'image/png'],
      images = []

    for (let i = 0; i < files.length; i++) {
      let file = files.item(i)
      if (types.includes(file.type) && allowed.test(file.name)) {
        const blob = new Blob([file], { type: file.type })
        // URL.createObjectURL(blob)
        images.push({
          name: file.name,
          blob: blob,
        })
      }
    }
    callback(images)
  }

  watch() {
    const form = this.shadowRoot.querySelector('form'),
      names = ['body', 'summary', 'title', 'image'],
      article = {}

    form.onsubmit = (e) => {
      e.preventDefault()

      const val = e.target.elements
      article.body = val.body.value
      article.summary = val.summary.value
      article.title = val.title.value
      this.createImage(val.image.files, (images) => {
        console.table(images)
        article['img'] = images[0]
      })
      Array.from(val).forEach((element) => {
        if (names.includes(element.name)) {
          element.value = ''
        }
      })
      this.toHtml(article)
    }
  }
  toHtml({ body, summary, title, img }) {
    const md = new Remarkable('full', {
        html: true,
        typographer: true,
      }),
      mdToHtml = (markdown) => md.render(markdown)

    try {
      title = mdToHtml(title)
      summary = mdToHtml(summary)
      body = mdToHtml(body)

      let article = {
        title,
        summary,
        img,
        body,
      }
      // send to database
      // backend server will shoot a statuscode trigering homepage to fetch new articles
      console.table(article)
      // make immedtialty at production
      setTimeout(() => location.assign('http://127.0.0.1:5500/'), 5000)
    } catch (err) {
      console.error(err.message)
    }
  }

  connectedCallback() {
    this.watch()
  }
}
function writeContent() {
  navbar()

  template.innerHTML = `
  ${css()}
  <form id="publish">
   <h1>Article </h1>
      <textarea  name="body" required  id="article-body" ></textarea>
    <h3>Article summary</h3>
    <textarea name="summary" required id="summary-article"></textarea>
    <div>
        Artice title <input type="text"  name="title" required id="article-title" />
    </div>
    <div >
       add image <input type="file" required  name="image" id="article-img" accept="image/*"/>
    </div>
    <input type="submit" value="Post Article" style="cursor:pointer;" />
  </form>`
  try {
    const customElement = window.customElements.get('full-kwala')

    if (typeof customElement === 'undefined') {
      window.customElements.define('full-kwala', Kwala)
      document.body.appendChild(new Kwala())
    } else {
      document.body.appendChild(new Kwala())
    }
  } catch (err) {
    console.error(err.message)
  }
}

function isAllowed() {
  auth((access) => {
    document.body.removeChild(document.querySelector('auth-card'))
    if (access) {
      writeContent()
    } else {
      location.assign('http://127.0.0.1:5500/')
    }
  })
}

isAllowed()
