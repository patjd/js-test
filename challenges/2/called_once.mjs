// —————————————————————————————————————————————————————————————————————————————
// Challenge: Called once
// —————————————————————————————————————————————————————————————————————————————
// Sometimes, a function should be called once. A typical use-case might be the
// initialization of a database client. Instead of having to set a boolean flag
// and check it later, it is possible to _decorate_ the function to prevent
// further calls to it.
//
// Write the `once` function to implement the desired behavior.
// —————————————————————————————————————————————————————————————————————————————
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
// —————————————————————————————————————————————————————————————————————————————

/**
 * Creates a version of `callback` that can only be called once.
 *
 * Repeated calls to the modified function will have no effect, returning the
 * value from the original call.
 *
 * @template {Function} F
 * @param {F} callback The callback
 * @returns {F}
 */
export function once(callback) {
  let result;
  return (...args) => {
    // `callback` must be called once!
    // Its return value must be memoized.
    if(callback) {
      result = callback(...args);
      callback = null;
    }
    return result;
  };
}
