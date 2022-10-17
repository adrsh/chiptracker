import { context } from './context'

/**
 *
 */
export class Instrument {
  oscillator
  gainNode
  /**
   * Constructor for Instrument.
   *
   * @param {string} type Oscillator type.
   */
  constructor (type) {
    this.audioContext = context.getAudioContext()
    this.oscillator = new OscillatorNode(this.audioContext, { type })
    this.gainNode = new GainNode(this.audioContext, { gain: 0 })
    this.oscillator.connect(this.gainNode).connect(this.audioContext.destination)
    this.oscillator.start()
  }

  /**
   * Plays a note at a specified time.
   *
   * @param {Note} note Which note to play. Ex. 48.
   * @param {number} time Time to play the note.
   */
  play (note, time = context.now()) {
    // Cancels any scheduled and ongoing changes to the gain value.
    this.gainNode.gain.cancelAndHoldAtTime(time)

    // Changes frequency of the oscillator.
    this.oscillator.frequency.setValueAtTime(note.getFrequency(), time)

    // Sets the gain to 0.1 at the specified time.
    this.gainNode.gain.setValueAtTime(0.1, time)

    // Ramps the gain to zero linearly one second after the time.
    this.gainNode.gain.linearRampToValueAtTime(0, time + 1)
  }

  /**
   * Release the note.
   *
   * @param {number} time Time to release the note.
   */
  release (time = context.now()) {
    this.gainNode.gain.cancelAndHoldAtTime(time)
    this.gainNode.gain.linearRampToValueAtTime(0, time + 0.5)
  }

  /**
   * Stops the oscillator.
   *
   * @param {number} time When to stop.
   */
  stop (time = context.now()) {
    this.gainNode.gain.cancelScheduledValues(time)
    this.oscillator.frequency.cancelScheduledValues(time)
    this.gainNode.gain.linearRampToValueAtTime(0, time + 0.02)
  }
}
