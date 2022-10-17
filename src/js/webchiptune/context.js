import { Pattern } from './pattern'

/**
 * Manages the audio context for the Chiptune module.
 */
class Context {
  /**
   * Constructor for handling the Audio Context.
   */
  constructor () {
    this.audioContext = new AudioContext()
    this.pattern = new Pattern()
  }

  /**
   * Starts or resumes the Audio Context.
   */
  start () {
    this.audioContext.resume()
  }

  /**
   * Returns the current time of the Audio Context.
   *
   * @returns {number} Current time
   */
  now () {
    return this.audioContext.currentTime + 0.02
  }

  /**
   * Get the audio context.
   *
   * @returns {AudioContext} Context.
   */
  getAudioContext () {
    return this.audioContext
  }

  /**
   * Get the pattern.
   *
   * @returns {Pattern} Chiptune pattern.
   */
  getPattern () {
    return this.pattern
  }
}

export const context = new Context()
