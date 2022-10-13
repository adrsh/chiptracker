import * as Chiptune from '../../webchiptune'

/**
 * The ct-sequence-note web component.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      font-family: monospace;
      height: 1rem;
      user-select: none;
      width: 2rem;
      letter-spacing: 0.05rem;
    }
  </style>
  <div id="name"></div>
`

customElements.define('ct-sequence-note',
  /**
   * Represents a note in the pattern.
   */
  class extends HTMLElement {
    /**
     * Constructor for the music tracker.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.name = this.shadowRoot.querySelector('#name')
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      this.name.textContent = '---'
      this.addEventListener('click', event => {
        this.dispatchEvent(new CustomEvent('selected', { detail: { row: this.row, note: this } }))
      })
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
    }

    /**
     * Returns element attributes to observe.
     *
     * @returns {string[]} An array of attributes to observe.
     */
    static get observedAttributes () {
      return ['note', 'row']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'note') {
        if (newValue) {
          this.note = new Chiptune.Note(parseInt(newValue))
          this.name.textContent = this.note.getNotation()
        } else {
          this.note = null
          this.name.textContent = '---'
        }
      } else if (name === 'row') {
        this.row = newValue
      }
    }
  }
)
