export function createElement(
  tag: keyof HTMLElementTagNameMap,
  props: { [key: string]: string },
  ...children: (string | false | null | undefined)[]
) {
  let propsEntries = Object.entries(props);
  return (
    `<${tag}${propsEntries.length == 0 ? "" : " "}${propsEntries
      .map(([k, v]) => `${k}="${v}"`)
      .join(" ")}>` +
    children.filter((v) => !!v).join("") +
    `</${tag}>`
  );
}

export const div = (
  props: { [key: string]: string },
  ...children: (string | false | null | undefined)[]
) => createElement("div", props, ...children);
export const span = (
  props: { [key: string]: string },
  ...children: (string | false | null | undefined)[]
) => createElement("span", props, ...children);

export const h1 = (props: { [key: string]: string }, ...children: string[]) =>
  createElement("h1", props, ...children);
export const p = (props: { [key: string]: string }, ...children: string[]) =>
  createElement("p", props, ...children);
export const code = (props: { [key: string]: string }, ...children: string[]) =>
  createElement("code", props, ...children);

export const a = (props: { [key: string]: string }, ...children: string[]) =>
  createElement("a", props, ...children);
export const button = (
  props: { [key: string]: string },
  ...children: string[]
) => createElement("button", props, ...children);

export const img = (props: { [key: string]: string }, ...children: string[]) =>
  createElement("img", props, ...children);
