import * as Chiptune from '../../webchiptune'
import '../ct-sequence-note'

/**
 * The ct-sequence web component.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      outline: black solid 1px;
      font-family: monospace;
    }
    #rows {
      display: flex;
      flex-direction: column;
    }
    #rows > ct-sequence-note {
      height: 1rem;
      width: 1.5rem;
      display: flex;
      justify-content: flex-end;
    }
  </style>
`

customElements.define('ct-sequence',
  /**
   * Represents a sequence/instrument.
   */
  class extends HTMLElement {
    /**
     * Constructor for the music tracker.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.sequence = new Chiptune.Sequence(new Chiptune.Instrument('square'))
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      for (let i = 0; i < 64; i++) {
        const sequenceNote = document.createElement('ct-sequence-note')
        sequenceNote.setAttribute('row', i)
        sequenceNote.addEventListener('selected', event => console.log(event.detail.row))
        this.shadowRoot.append(sequenceNote)
      }
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
    }
  }
)
