import loading from './utils/Loading.js'
import navbar from './utils/Navbar.js'
import mode from './utils/Darkmode.js'
import searchbar from './utils/Search.js'
import { articles } from './utils/Fetch.js'

navbar()
mode()
searchbar()
const headlines = document.createElement('section')
headlines.setAttribute('id', 'headlines')
headlines.innerHTML = loading()
document.body.appendChild(headlines)
articles()

