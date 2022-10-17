import { Sequence } from './sequence'

/**
 * Represents a pattern (multiple sequences)
 */
export class Pattern {
  #sequences
  /**
   * Constructor for pattern.
   */
  constructor () {
    this.#sequences = new Set()
  }

  /**
   * Add a sequence to the pattern.
   *
   * @param {Sequence} sequence
   */
  add (sequence) {
    this.#sequences.add(sequence)
  }

  /**
   * Remove a sequence from the pattern.
   *
   * @param {Sequence} sequence
   */
  remove (sequence) {
    this.#sequences.remove(sequence)
  }

  /**
   * Plays the pattern.
   *
   * @param {number} tempo
   */
  play (tempo) {
    for (const sequence of this.#sequences) {
      sequence.play(tempo)
    }
  }

  /**
   * Stops the pattern.
   *
   */
  stop () {
    for (const sequence of this.#sequences) {
      sequence.stop()
    }
  }
}
