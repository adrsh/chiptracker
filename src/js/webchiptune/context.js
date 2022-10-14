/**
 * Manages the audio context for the Chiptune module.
 */
class Context {
  /**
   * Constructor for handling the Audio Context.
   */
  constructor () {
    this.audioContext = new AudioContext()
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
}

export const context = new Context()
