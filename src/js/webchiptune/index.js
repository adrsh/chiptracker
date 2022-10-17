import { context } from './context'

export { Note } from './note'
export { Instrument } from './instrument'
export { Sequence } from './sequence'

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

export const Pattern = context.getPattern()
