import '../ct-sequence'
import '../ct-options'
import '../ct-cursor'
import * as Chiptune from '../../webchiptune'

/**
 * The ct-tracker web component.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      outline: #444 solid 3px;
      font-family: monospace;
      width: 48rem;
      height: 48rem;
    }
    #pattern {
      overflow-y: scroll;
    }
    #pattern, #sequences {
      display: flex;
      flex-direction: row;
      font-family: monospace;
    }
    #rows {
      display: flex;
      flex-direction: column;
    }
    #rows > div {
      height: 1rem;
      width: 1.75rem;
      display: flex;
      justify-content: center;
      user-select: none;
      color: green;
      border-right: 1px gray solid;
      box-sizing: border-box;
    }
    #rows > div:nth-child(4n+1) {
      color: yellow;
    }
    ct-sequence {
      width: 2rem;
    }
    ct-options {
      border-bottom: 1px solid gray;
    }
    #sequences {
      position: relative;
    }
  </style>
  <ct-options tempo="120"></ct-options>
  <div id="pattern">
    <div id="rows"></div>
    <div id="sequences">
      <ct-cursor column="0" row="0"></ct-cursor>
      <ct-sequence column="0" instrument="square"></ct-sequence>
      <ct-sequence column="1" instrument="triangle"></ct-sequence>
      <ct-sequence column="2" instrument="sawtooth"></ct-sequence>
      <ct-sequence column="3" instrument="sine"></ct-sequence>
    </div>
  </div>
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

      this.options = this.shadowRoot.querySelector('ct-options')
      this.cursor = this.shadowRoot.querySelector('ct-cursor')
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
          this.#handleKeyDownEvent(event)
        }
      })

      for (const sequence of this.shadowRoot.querySelectorAll('ct-sequence')) {
        sequence.addEventListener('selected', event => {
          this.cursor.setAttribute('column', event.detail.column)
          this.cursor.setAttribute('row', event.detail.row)
        })
      }

      this.options.addEventListener('play', () => this.#playPattern())
      this.options.addEventListener('stop', () => this.#stopPattern())
    }

    /**
     * Handle key presses.
     *
     * @param {Event} event The event.
     */
    #handleKeyDownEvent (event) {
      if (this.#isNoteKey(event.code)) {
        this.#handleNoteEvent(event)
      } else if (this.#isActionKey(event.code)) {
        this.#handleActionEvent(event)
      }
    }

    /**
     * Check if the key is mapped to a note.
     *
     * @param {string} key Key to check.
     * @returns {boolean} If the key is mapped to a note, true.
     */
    #isNoteKey (key) {
      if (this.#getNoteFromKey(key)) {
        return true
      } else {
        return false
      }
    }

    /**
     * Check if the key is mapped to an action.
     *
     * @param {string} key Key to check.
     * @returns {boolean} If the key is mapped to an action, true.
     */
    #isActionKey (key) {
      if (this.#getKeyFromMapping(key)) {
        return true
      } else {
        return false
      }
    }

    /**
     * Handle note key press event.
     *
     * @param {Event} event
     */
    #handleNoteEvent (event) {
      const noteNumber = this.#getNoteFromKey(event.code)
      this.selectedNote = this.#selectNote(this.cursor.column, this.cursor.row)
      this.selectedNote.setAttribute('note', noteNumber)
    }

    /**
     * Handle action key press event.
     *
     * @param {Event} event
     */
    #handleActionEvent (event) {
      event.preventDefault()
      const key = this.#getKeyFromMapping(event.code)
      if (key === 'Delete') {
        this.selectedNote = this.#selectNote(this.cursor.column, this.cursor.row)
        this.selectedNote.removeAttribute('note')
      } else if (key === 'Play') {
        this.#playPattern()
      }
    }

    /**
     * Get which key that corresponds to which action.
     *
     * @param {string} key Keyboard key.
     * @returns {string} Action that corresponds to the key.
     */
    #getKeyFromMapping (key) {
      switch (key) {
        case 'Delete': return 'Delete'
        case 'Space': return 'Play'
        default: return null
      }
    }

    /**
     * Select note by column and row.
     *
     * @param {number} column Column
     * @param {number} row Row
     * @returns {HTMLElement} The selected note element.
     */
    #selectNote (column, row) {
      const sequenceElement = this.shadowRoot.querySelector(`ct-sequence[column="${column}"]`)
      const sequenceNote = sequenceElement.shadowRoot.querySelector(`ct-sequence-note[row="${row}"]`)
      return sequenceNote
    }

    /**
     * Plays the pattern.
     */
    #playPattern () {
      Chiptune.start()
      const tempo = this.options.getAttribute('tempo')
      Chiptune.Pattern.play(tempo)
    }

    /**
     * Stops the pattern.
     */
    #stopPattern () {
      Chiptune.Pattern.stop()
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
     * @returns {number} Note that should be played.
     */
    #getNoteFromKey (key) {
      switch (key) {
        case 'KeyZ': return 48
        case 'KeyS': return 49
        case 'KeyX': return 50
        case 'KeyD': return 51
        case 'KeyC': return 52
        case 'KeyV': return 53
        case 'KeyG': return 54
        case 'KeyB': return 55
        case 'KeyH': return 56
        case 'KeyN': return 57
        case 'KeyJ': return 58
        case 'KeyM': return 59
        case 'Comma': return 60
        case 'KeyQ': return 60
        case 'KeyL': return 61
        case 'Digit2': return 61
        case 'Period': return 62
        case 'KeyW': return 62
        case 'Semicolon': return 63
        case 'Digit3': return 63
        case 'Slash': return 64
        case 'KeyE': return 64
        case 'KeyR': return 65
        case 'Digit5': return 66
        case 'KeyT': return 67
        case 'Digit6': return 68
        case 'KeyY': return 69
        case 'Digit7': return 70
        case 'KeyU': return 71
        case 'KeyI': return 72
        case 'Digit9': return 73
        case 'KeyO': return 74
        case 'Digit0': return 75
        case 'KeyP': return 76
        default: return null
      }
    }
  }
)
