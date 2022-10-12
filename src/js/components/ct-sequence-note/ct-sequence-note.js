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
    }
    .selected {
      background-color: #BBB;
    }
  </style>
`

customElements.define('ct-sequence-note',
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
      // this.setAttribute('contenteditable', 'true')
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      this.shadowRoot.textContent = '---'
      this.addEventListener('click', event => {
        this.dispatchEvent(new CustomEvent('selected', { detail: { row: this.row } }))
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
        this.note = newValue
        this.textContent = this.note
      } else if (name === 'row') {
        this.row = newValue
      }
    }
  }
)
