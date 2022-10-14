import { Instrument } from './instrument'
import { Note } from './note'
import { context } from './context'

/**
 * Represent a sequence of notes.
 */
export class Sequence {
  /**
   * Constructor for Chiptune sequence.
   *
   * @param {Instrument} instrument Instrument to be played by the sequencer.
   */
  constructor (instrument) {
    this.sequence = []
    this.instrument = instrument
  }

  /**
   * Starts playing the sequence.
   *
   * @param {number} tempo Tempo for the sequence to be played.
   * @param {number} time Time for when to play the sequence.
   */
  play (tempo = 120, time = context.now()) {
    this.instrument.stop()
    const tickLength = 1 / ((tempo * 4) / 60)
    for (let index = 0; index < 64; index++) {
      if (this.sequence[index]) {
        this.instrument.play(this.sequence[index], time + (tickLength * index))
      }
    }
  }

  /**
   * Stop the sequence from playing.
   *
   * @param {number} time Time of when to stop the sequence from playing.
   */
  stop (time = context.now()) {
    this.instrument.stop(time)
  }

  /**
   * Adds a note to the sequence.
   *
   * @param {number} row Row of note to be played.
   * @param {number | string} note Note to be played.
   */
  add (row, note) {
    if (row < 0 || row > 63) {
      throw new Error('Row is out of range.')
    }
    this.sequence[row] = new Note(note)
  }

  /**
   * Delete a note from a row.
   *
   * @param {number} row Row to delete note from.
   */
  delete (row) {
    delete this.sequence[row]
  }
}
