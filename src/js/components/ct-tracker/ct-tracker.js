import '../ct-sequence'

/**
 * The ct-tracker web component.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: row;
      outline: black solid 1px;
      font-family: monospace;
    }
    #rows {
      display: flex;
      flex-direction: column;
    }
    #rows > div {
      height: 1rem;
      width: 1.5rem;
      display: flex;
      justify-content: center;
    }
  </style>
  <div id="rows"></div>
  <ct-sequence></ct-sequence>
`

customElements.define('ct-tracker',
  /**
   * Represents a music tracker.
   */
  class extends HTMLElement {
    /**
     * Constructor for the music tracker.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      const rows = this.shadowRoot.querySelector('#rows')
      for (let i = 0; i < 64; i++) {
        const div = document.createElement('div')
        div.textContent = i.toString(16).toUpperCase().padStart(2, '0')
        rows.append(div)
      }

      document.addEventListener('keydown', event => {
        if (!event.repeat) {
          console.log(this.#getNoteFromKey(event.code))
        }
      })
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
    }

    /**
     * Returns which note that is mapped to which key on the keyboard.
     *
     * @param {string} key Key that was pressed on the keyboard.
     * @returns {string} Note that should be played.
     */
    #getNoteFromKey (key) {
      switch (key) {
        case 'KeyZ':
          return '48'
        case 'KeyX':
          return '50'
        case 'KeyC':
          return '52'
        case 'KeyV':
          return '53'
        case 'KeyB':
          return '55'
        case 'KeyN':
          return '57'
        case 'KeyM':
          return '59'
        case 'Comma':
          return '60'
        case 'Period':
          return '62'
        case 'Slash':
          return '64'
        case 'KeyL':
          return '61'
        case 'Semicolon':
          return '63'

        case 'KeyS':
          return '49'
        case 'KeyD':
          return '51'
        case 'KeyG':
          return '54'
        case 'KeyH':
          return '56'
        case 'KeyJ':
          return '58'

        case 'KeyQ':
          return '60'
        case 'KeyW':
          return '62'
        case 'KeyE':
          return '64'
        case 'KeyR':
          return '65'
        case 'KeyT':
          return '67'
        case 'KeyY':
          return '69'
        case 'KeyU':
          return '71'
        case 'KeyI':
          return '72'
        case 'KeyO':
          return '74'
        case 'KeyP':
          return '76'

        case 'Digit2':
          return '61'
        case 'Digit3':
          return '63'
        case 'Digit5':
          return '66'
        case 'Digit6':
          return '68'
        case 'Digit7':
          return '70'
        case 'Digit9':
          return '73'
        case 'Digit0':
          return '75'

        default:
          return ''
      }
    }
  }
)
