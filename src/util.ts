// IDEA $ generate an array of strings and functions, strings
// are static parts of the whole thing and function have to
// be executed for each render

export function $(
  tag: keyof HTMLElementTagNameMap,
  props: { [key: keyof HTMLElement | string]: string } = {}
) {
  return (...content: (string | false | null | undefined)[]) =>
    `<${tag} ${Object.entries(props)
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ")}>${content.filter((v) => !!v).join("")}</${tag}>`;
}

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
 * Toggles `a` and `b` depending on the `condition`.
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
 * Replace `token` by `newToken` or add `newToken` to classList.
 */
export function replaceClass(
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
