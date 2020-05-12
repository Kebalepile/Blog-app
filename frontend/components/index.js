import navbar from './utils/Navbar.js'
import mode from './utils/Darkmode.js'
import searchbar from './utils/Search.js'
import { getArticles } from './utils/Fetch.js'
import { wipe } from './utils/IndexedDB.js'

// mount components
navbar()
// dark mode toggle (a nice to have)
mode()
// search bar (a nice to have)
searchbar()
// fetch articles thumbnails & relevent articles
getArticles()
// refrash articles objectStore
window.onclose = wipe
