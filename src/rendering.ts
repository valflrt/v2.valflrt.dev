type StringOr = string | false | null | undefined;

export function createElement(
  tag: keyof HTMLElementTagNameMap,
  props: { [key: string]: string },
  ...children: StringOr[]
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
export function join(...html: StringOr[]): string {
  return html.filter((p) => !!p).join("");
}

export const div = (
  props: { [key: string]: string },
  ...children: StringOr[]
) => createElement("div", props, ...children);
export const span = (
  props: { [key: string]: string },
  ...children: StringOr[]
) => createElement("span", props, ...children);

export const h1 = (props: { [key: string]: string }, ...children: StringOr[]) =>
  createElement("h1", props, ...children);
export const p = (props: { [key: string]: string }, ...children: StringOr[]) =>
  createElement("p", props, ...children);
export const code = (
  props: { [key: string]: string },
  ...children: StringOr[]
) => createElement("code", props, ...children);

export const a = (props: { [key: string]: string }, ...children: StringOr[]) =>
  createElement("a", props, ...children);
export const button = (
  props: { [key: string]: string },
  ...children: StringOr[]
) => createElement("button", props, ...children);

export const img = (
  props: { [key: string]: string },
  ...children: StringOr[]
) => createElement("img", props, ...children);

export function removeHtmlTags(html: string): string {
  // Use a regular expression to match and remove HTML tags
  return html.replace(/<[^>]*>/g, "");
}
