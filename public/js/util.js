/// <reference path="../../index.d.ts" />

/**
 * Adds a window event listener to several event
 * types.
 * @param {string[]} events
 * @param {<K extends keyof WindowEventMap>(name: K, e: WindowEventMap[K]) => unknown} listener
 */
export function addWindowEventListeners(events, listener) {
  events.forEach((v) => {
    window.addEventListener(v, (e) => listener(v, e));
  });
}

/**
 * Toggles classnames `a` and `b` depending on
 * `condition` (when `condition` is `true`, `a` is
 * added and `b` removed and when it is `false`, `a`
 * is removed and `b` added).
 * @param {Element} element
 * @param {bool} condition
 * @param {string} a
 * @param {string} b
 */
export function conditionalClass(element, condition, a, b) {
  if (condition) {
    if (b) element.classList.remove(b);
    element.classList.add(a);
  } else {
    element.classList.remove(a);
    if (b) element.classList.add(b);
  }
}

/**
 * Replace `token` with `newToken` or add `newToken`
 * to classList.
 * @param {HTMLElement} element
 * @param {StringOrFalsy} token
 * @param {string} newToken
 */
export function replaceOrAddClass(element, token, newToken) {
  if (token && element.classList.contains(token))
    element.classList.replace(token, newToken);
  else element.classList.add(newToken);
}

/**
 * Creates a promise that resolves after `ms`
 * milliseconds.
 * @param {number} ms
 * @returns {Promise<unknown>}
 */
export function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Displays human-readable elapsed time.
 * @param {number} ms
 * @returns {string}
 */
export function elapsedTime(ms) {
  function addS(n) {
    return n > 1 ? "s" : "";
  }
  function compute(n, d) {
    return [Math.floor(n / d), Math.floor(n % d)];
  }

  let elapsed = (Date.now() - ms) / 1000;

  let [years, yearsRemaining] = compute(elapsed, 60 * 60 * 24 * 365.24);
  let [days, daysRemaining] = compute(yearsRemaining, 60 * 60 * 24);
  let [hours, _hoursRemaining] = compute(daysRemaining, 60 * 60);
  // let [minutes, _minutesRemaining] = compute(hoursRemaining, 60);
  // let seconds = minutesRemaining % 60;

  return Object.entries({
    year: years,
    day: days,
    hour: hours,
    // minute: minutes,
    // second: seconds,
  })
    .map(([k, v], i, arr) =>
      v
        .toFixed()
        .concat(" ")
        .concat(k)
        .concat(addS(v))
        .concat(i === arr.length - 2 ? " and" : ""),
    )
    .join(" ");
}

/**
 * Shuffles an array.
 * @template T
 * @param {T} array
 * @returns {T[]}
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
