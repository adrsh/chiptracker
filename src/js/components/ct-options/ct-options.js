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
  <input type="number" min="32" max="255" value="120" id="tempo"></input>
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
      this.tempoInput = this.shadowRoot.querySelector('#tempo')
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      this.playButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('play')))
      this.stopButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('stop')))

      this.tempoInput.addEventListener('input', () => this.setAttribute('tempo', this.tempoInput.value))
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
      return ['tempo']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'tempo') {
        this.tempo = parseInt(newValue)
        this.tempoInput.value = this.tempo
      }
    }
  }
)
