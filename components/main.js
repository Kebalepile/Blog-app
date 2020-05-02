import navbar from './utils/Navbar.js'
import mode from "./utils/Darkmode.js"
import searchbar from './utils/Search.js'
import artices from './article/Articles.js'

// mount components
navbar()
mode()
searchbar()

// fetch articles thumbnails & relevent articles
fetch('../post.json')
  .then((res) => res.json())
  .then((data) => {
      // console.table(data)
      // store data in indexDB or localStroage
      const  articles = document.createElement('section')
      articles.setAttribute('id', 'articles')
      document.body.appendChild(articles)
    artices(data)
  })
  .catch((err) => console.error(err))



