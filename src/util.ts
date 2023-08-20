export function fmt<T extends keyof HTMLElementTagNameMap>(
  strings: TemplateStringsArray,
  ...elements: {
    0: string; // content
    1: T; // tag
  }[]
) {
  return strings
    .map((s, i) =>
      i !== strings.length - 1
        ? s.concat(`<${elements[i][1]}>${elements[i][0]}</${elements[i][1]}>`)
        : s
    )
    .join("");
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
