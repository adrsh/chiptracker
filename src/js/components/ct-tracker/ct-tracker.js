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
      justify-content: flex-end;
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
        div.textContent = i
        rows.append(div)
      }
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
    }
  }
)
