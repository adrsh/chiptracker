/**
 * The ct-cursor web component.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      position: absolute;
      width: 2rem;
      height: 1rem;
      background-color: #000;
      opacity: 0.25;
    }
  </style>
`

customElements.define('ct-cursor',
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

      this.column = 0
      this.row = 0
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      document.addEventListener('keydown', event => {
        if (this.#isArrowKey(event.key)) {
          event.preventDefault()
          this.#handleArrowKeys(event.key)
        }
      })
    }

    /**
     * Checks if the key is an arrow key.
     *
     * @param {String} key Key code.
     * @returns {boolean} True if the key is an arrow key.
     */
    #isArrowKey (key) {
      return (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown')
    }

    /**
     * Handle arrow keys.
     *
     * @param {string} key Key.
     */
    #handleArrowKeys (key) {
      switch (key) {
        case 'ArrowLeft':
          this.setAttribute('column', this.column - 1)
          break
        case 'ArrowRight':
          this.setAttribute('column', this.column + 1)
          break
        case 'ArrowUp':
          this.setAttribute('row', this.row - 1)
          break
        case 'ArrowDown':
          this.setAttribute('row', this.row + 1)
          break
      }
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
      return ['column', 'row']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'column') {
        const newColumn = parseInt(newValue)
        if (!(newColumn < 0 || newColumn > 3)) {
          this.column = newColumn
          this.#updatePosition()
        }
      } else if (name === 'row') {
        const newRow = parseInt(newValue)
        if (!(newRow < 0 || newRow > 63)) {
          this.row = newRow
          this.#updatePosition()
        }
      }
    }

    /**
     * Updates the position of the cursor.
     */
    #updatePosition () {
      this.style.top = this.row + 'rem'
      this.style.left = (this.column * 2) + 'rem'
    }
  }
)
