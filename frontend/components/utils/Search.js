import css from './Css.js'

export default function createComponent() {
  try {
    const template = document.createElement('template')
    template.innerHTML = `
${css()}
<form class="searchbar" spellcheck="true" title="search for an article" >
    <input type="submit" value="Find"  disabled />
    <input type="search" spellcheck="true"  disabled
    placeholder=" Find article by title e.g 'Blockchain'" 
    required />
</form>`
    class Searchbar extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
      makeWords(word) {
        word = word.trim()
        let newWords = []
        if (word.includes(' ')) {
          newWords = word.split(' ')
          conosle.log(newWords)
        } else {
          let percentage = Number((word.length / 100) * 25).toFixed(0)
          , count = 4
          , start = 0
          , end = percentage

          for (let i = 0; i < count; i++) {
            let newWord = word.substr(start, end)
            if (newWord !== '') {
              newWords.push(newWord)
              start = end
              end++
            }
          }
        }

        let store = JSON.parse(sessionStorage.getItem('titles')),
         possibleMatchs = [],
         titles = store.reduce((acc, obj) => {
            acc.push(...Object.keys(obj));
            return acc;
        },[]),
         xId = key => {
          let obj = store.reduce((acc, obj) => {
            if(obj.hasOwnProperty(key)) {
              acc = obj
            }
            return acc;
          },{})

          if (!possibleMatchs.includes(obj)) {
            return(obj);
          }
          
        }
        
        for (let wrd of newWords) {
        
            for(let i = 0; i < titles.length; i++) {
                  if (titles[i].includes(wrd)) {
                  possibleMatchs.push(xId(terms[i]));
              }
            }
        }              
      
      }
   
      watch() {
        const form = this.shadowRoot.querySelector('.searchbar')

        form.onsubmit = async (e) => {
          e.preventDefault()

          let x = e.target.elements,
            val = await x[1].value,
            module = await import('./Sanitize.js'),
            text = module.escape(module.toText(val).data)

      
          x[1].value = ''
          x[0].blur()
        }
      }
      connectedCallback() {
        this.watch()
      }
    }

    window.customElements.define('search-bar', Searchbar)
    document.body.appendChild(new Searchbar())
  } catch (err) {
    alert(
      "Browser your using does not support, (keba's blog version), please use different browser",
    )
  }
}
