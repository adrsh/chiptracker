import '../ct-sequence'
import * as Chiptune from '../../webchiptune'

/**
 * The ct-options web component.
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
  </style>
  <button id="play-button">Play</button>
`

customElements.define('ct-options',
  /**
   * Represents ct-options.
   */
  class extends HTMLElement {
    /**
     * Constructor for the ct-options.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.playButton = this.shadowRoot.querySelector('#play-button')
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      this.playButton.addEventListener('click', Chiptune.start())
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
    }
  }
)
