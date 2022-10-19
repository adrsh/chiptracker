/**
 * Class representing a note.
 */
export class Note {
  #number
  /**
   * Constructor for Note.
   *
   * @param {number | string} note Note
   */
  constructor (note) {
    try {
      if (typeof note === 'number') {
        this.number = note
      } else if (typeof note === 'string') {
        this.number = this.#noteNotationToNoteNumber(note)
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Sets the number of Note.
   *
   * @param {number} value Number to set the note to.
   */
  set number (value) {
    if (value < 12 || value > 120) {
      throw new Error('Note is out of range.')
    }
    this.#number = value
  }

  /**
   * Get the number of the note.
   *
   * @returns {number} Note number.
   */
  get number () {
    return this.#number
  }

  /**
   * Get the frequency of the note.
   *
   * @returns {number} Note frequency.
   */
  get frequency () {
    return 440 * 2 ** ((this.#number - 69) / 12)
  }

  /**
   * Get this note as notation. Ex. C4.
   *
   * @returns {string} Note notation.
   */
  get notation () {
    return this.name + this.octave
  }

  /**
   * Get the octave of the note.
   *
   * @returns {string} Note octave.
   */
  get octave () {
    return Math.floor((this.#number - 12) / 12)
  }

  /**
   * Get the name of the note.
   *
   * @returns {string} Note name.
   */
  get name () {
    return this.#noteIndexToNoteName(this.#number % 12)
  }

  /**
   * Convert note notation to note number.
   *
   * @param {string} notation Note notation to convert to note number. Ex. C4 = 60. C#4 = 61
   * @returns {number} Note number that the note notation corresponds to.
   */
  #noteNotationToNoteNumber (notation) {
    if (notation.length > 3 || notation.length < 2) {
      throw new Error('Note notation has an invalid format.')
    }

    const octave = this.#extractOctaveFromNoteNotation(notation)
    const noteName = this.#extractNoteNameFromNoteNotation(notation)
    const noteIndex = this.#noteNameToNoteIndex(noteName)

    // C4 is 60, but (octave * 12) + noteIndex would return 48.
    // Which is why we have to add 12.
    return (octave * 12) + noteIndex + 12
  }

  /**
   * Extract octave from notation.
   *
   * @param {string} notation
   * @returns {number} octave Note octave.
   */
  #extractOctaveFromNoteNotation (notation) {
    const octave = parseInt(notation.charAt(notation.length - 1))
    if (isNaN(octave) || octave < 0 || octave > 8) {
      throw new Error('Octave is out of range.')
    }
    return octave
  }

  /**
   * Extract note name from notation.
   *
   * @param {string} notation
   * @returns {string} Note name.
   */
  #extractNoteNameFromNoteNotation (notation) {
    if (notation.length === 2) {
      return notation.slice(0, 1)
    } else if (notation.length === 3) {
      return notation.slice(0, 2)
    }
  }

  /**
   * Convert name of note to index.
   *
   * @param {string} noteName Name of note to convert to index. C = 0, C# = 1...
   * @returns {number} Note name.
   */
  #noteNameToNoteIndex (noteName) {
    switch (noteName) {
      case 'C': return 0
      case 'C#': return 1
      case 'D': return 2
      case 'D#': return 3
      case 'E': return 4
      case 'F': return 5
      case 'F#': return 6
      case 'G': return 7
      case 'G#': return 8
      case 'A': return 9
      case 'A#': return 10
      case 'B': return 11
      default: throw new Error('Invalid note name.')
    }
  }

  /**
   * Convert note index to note name.
   *
   * @param {number} noteIndex Note to convert to name, ex. 0 = C, 1 = C#...
   * @returns {string} Note name.
   */
  #noteIndexToNoteName (noteIndex) {
    switch (noteIndex) {
      case 0: return 'C'
      case 1: return 'C#'
      case 2: return 'D'
      case 3: return 'D#'
      case 4: return 'E'
      case 5: return 'F'
      case 6: return 'F#'
      case 7: return 'G'
      case 8: return 'G#'
      case 9: return 'A'
      case 10: return 'A#'
      case 11: return 'B'
      default: throw new Error('Note index is out of range.')
    }
  }
}
