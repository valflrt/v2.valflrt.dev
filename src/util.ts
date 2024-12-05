export function addWindowEventListeners(
  events: (keyof WindowEventMap)[],
  listener: <K extends keyof WindowEventMap>(
    name: K,
    v: WindowEventMap[K]
  ) => unknown
) {
  events.forEach((v) => {
    window.addEventListener(v, (eventObject) => listener(v, eventObject));
  });
}

/**
 * Toggles `a` and `b` depending on `condition` (when
 * `condition` is `true`, `a` is enabled and `b` disabled if
 * present and when it is `false`, `a` is disabled and `b`
 * enabled if present).
 */
export function toggleClass(
  element: Element,
  condition: boolean,
  a: string,
  b?: string
) {
  if (condition) {
    if (b) element.classList.remove(b);
    element.classList.add(a);
  } else {
    element.classList.remove(a);
    if (b) element.classList.add(b);
  }
}

/**
 * Replace `token` with `newToken` or add `newToken` to
 * classList.
 */
export function replaceOrAddClass(
  element: Element,
  token: string | false | null | undefined,
  newToken: string
) {
  if (token && element.classList.contains(token))
    element.classList.replace(token, newToken);
  else element.classList.add(newToken);
}

export function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function elapsedTime(msDate: number) {
  function addS(n: number) {
    return n > 1 ? "s" : "";
  }
  function compute(n: number, d: number) {
    return [Math.floor(n / d), Math.floor(n % d)];
  }

  let elapsed = (Date.now() - msDate) / 1000;

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
        .concat(i === arr.length - 2 ? " and" : "")
    )
    .join(" ");
}
