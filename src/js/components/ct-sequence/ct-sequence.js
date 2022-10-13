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
    ct-sequence-note[selected] {
      background-color: #ddd;
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

      this.instrument = new Chiptune.Instrument('square')
      this.sequence = new Chiptune.Sequence(this.instrument)
    }

    /**
     * Called after the element is inserted to the DOM.
     */
    connectedCallback () {
      this.#generateNotes()
      const noteObserver = new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          const row = mutation.target.getAttribute('row')
          const note = mutation.target.getAttribute('note')
          if (note) {
            this.sequence.add(row, parseInt(note))
          } else {
            this.sequence.delete(row)
          }
        }
      })
      noteObserver.observe(this.shadowRoot, {
        subtree: true,
        attributeFilter: ['note']
      })
    }

    /**
     * Generate notes with event listeners.
     */
    #generateNotes () {
      for (let i = 0; i < 64; i++) {
        const sequenceNote = document.createElement('ct-sequence-note')
        sequenceNote.setAttribute('row', i)
        sequenceNote.addEventListener('selected', event => {
          this.dispatchEvent(new CustomEvent('selected', { detail: { column: this.column, row: event.detail.row, note: event.detail.note } }))
        })
        this.shadowRoot.append(sequenceNote)
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
      return ['column', 'instrument']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'instrument') {
        this.instrument = new Chiptune.Instrument(newValue)
      } else if (name === 'column') {
        this.column = newValue
      }
    }
  }
)
