// read later articles
// newly loaded articles by author
// delete all except readlater / saved for referance articles
// when enduser closes browser

let name = 'keba"s blog',
  version = 1,
  storageNames = ['articles', 'savedForLater'],
  dbReq

const upgrade = () => {
    // gets triggred if client had no database initialise you're object stores
    let db = dbReq.result
    storageNames.forEach((name) => {
      if (!db.objectStoreNames.contains(name)) {
        let storeObj = db.createObjectStore(name, {
          keyPath: 'id',
          // autoIncrement: true
        })
        storeObj.createIndex('title', 'title')
        storeObj.createIndex('body', 'body')
        storeObj.createIndex('summary', 'summary')
      }
    })
  },
  success = () => {
    // continue to work with you're database.
    let db = dbReq.result
    db.onversionchange = () => {
      db.close()
      alert('Database is outdated, please reload page.')
    }
    db.close()
  },
  bothata = () => {
    console.error(`Bothata ka database papa: ${dbReq.error}`)
  },
  blocked = () => {
    // there's another connection to same database and it wasn't closed  AFTER db.onversionchange triggered frpm them.
    alert(
      "Warning there's another coonnection to same indexed,  SOMEONE MAY BE HACKEING YOU RIGHT NOW !!!",
    )
  }
const notSupported = () =>
  "IndexedDB is not supported by your browser, thus this web-app won't perform as expected ! ( consider using a different / updated browser)"

export function openDB(onsuck = undefined) {
  if ('indexedDB' in window) {
    dbReq = indexedDB.open(name, version)
    dbReq.onerror = bothata
    dbReq.onblocked = blocked

    dbReq.onupgradeneeded = upgrade
    dbReq.onsuccess = typeof onsuck === 'undefined' ? success : onsuck
  } else {
    notSupported()
  }
}
export function populateStore(articles) {
  try {
    openDB(() => {
      let db = dbReq.result,
        tnx = db.transaction('articles', 'readwrite'),
        objectStore = tnx.objectStore('articles')

      articles.forEach((article) => {
        objectStore.add(article)
      })
      db.close()
    })
  } catch (err) {
    console.error(err.message)
  }
}
export function getArticle_(id, next) {
  try {
    openDB(async () => {
      try {
        let db = dbReq.result
        let tnx = db.transaction('articles'),
          objectStore = tnx.objectStore('articles'),
          query = objectStore.get(id)

        query.onsuccess = (e) => (query = e.target.result)
        // important timeout of the century
        setTimeout(() => {
          next(query)
          db.close()
        }, 1000)
      } catch (err) {
        console.error(err.message)
      }
    })
  } catch (err) {
    console.error(err.message)
  }
}

export function wipe() {
  try {
    openDB(() => {
      let db = dbReq.result
      db.deleteObjectStore('articles')
      db.close()
    })
  } catch (err) {
    console.error(err.message)
  }
}
export function readOffline(article) {
  try {
    openDB(() => {
      let db = dbReq.result,
        tnx = db.transaction('savedForLater', 'readwrite'),
        objectStore = tnx.objectStore('savedForLater')

      objectStore.add(article)

      db.close()
    })
  } catch (err) {
    console.error(err.message)
  }
}

export function deleteStore() {
  try {
    openDB(() => {
      let db = dbReq.result
      //   fire on window.close === true
      db.deleteObjectStore('articles')

      db.close()
    })
  } catch (err) {
    console.error(err.message)
  }
}

export function deleteSavedArticle(id) {
  try {
    openDB(() => {
      let db = dbReq.result
      let tnx = db.transaction('savedForLater', 'readwrite'),
        objectStore = tnx.objectStore('savedForLater')
      objectStore.delete(id)

      db.close()
    })
  } catch (err) {
    console.error(err.message)
  }
}
export function getSavedArticles(next) {
  try {
    openDB(() => {
      let db = dbReq.result
      let tnx = db.transaction('savedForLater'),
        objectStore = tnx.objectStore('savedForLater'),
        query = objectStore.getAll()
      query.onsuccess = (e) => (query = e.target.result)
      // important timeout of the century
      setTimeout(() => {
        next(query)
        db.close()
      }, 1000)
    })
  } catch (err) {
    console.error(err.message)
  }
}
//a nice to have export function
export function search(param, next) {
  try {
  } catch (err) {
    console.error(err.message)
  }
}

// dbReq,
// populateStore,
// getArticle,
// refrash,
// deleteStore,
// getSavedArticles,
// search,
