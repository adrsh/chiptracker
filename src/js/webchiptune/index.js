import { context } from './context'

export { Note } from './note'
export { Instrument } from './instrument'
export { Sequence } from './sequence'

/**
 * Class for the Chiptune module.
 */
export class Chiptune {
  context
  /**
   * Constructor for the Chiptune class.
   */
  constructor () {
    this.context = context
  }

  /**
   * Start the Chiptune by starting/resuming the audio context.
   */
  start () {
    this.context.start()
  }

  /**
   * Returns the current time of the Audio Context.
   *
   * @returns {number} Current time
   */
  now () {
    return this.context.now()
  }
}

/**
 * Start the Chiptune by starting/resuming the audio context.
 */
export function start () {
  context.start()
}

/**
 * Returns the current time of the Audio Context.
 *
 * @returns {number} Current time
 */
export function now () {
  return context.now()
}
