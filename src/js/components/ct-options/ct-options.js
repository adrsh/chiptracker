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
    }
  </style>
  <button id="play-button">Play</button>
  <button id="stop-button">Stop</button>
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
      this.stopButton = this.shadowRoot.querySelector('#stop-button')
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      this.playButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('play')))
      this.stopButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('stop')))
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
    }
  }
)
