type TagPropsMap = {
  [K in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[K]>;
};

type ToHTML =
  | HTMLElement
  | DocumentFragment
  | string
  | false
  | null
  | undefined;

/**
 * Creates an HTML element.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: TagPropsMap[K],
  ...children: ToHTML[]
): HTMLElementTagNameMap[K] {
  let element = document.createElement(tag);

  Object.entries(props).forEach((pair) => {
    let [k, v] = pair;
    element.setAttribute(k, v);
  });

  children
    .filter((v) => !!v)
    .forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child.toString()));
      } else {
        element.appendChild(child as Node);
      }
    });

  return element;
}

/**
 * Unit element: acts like a container for other elements.
 * Similar to `<></>` in react.
 */
export function unit(...children: ToHTML[]): DocumentFragment {
  let fragment = document.createDocumentFragment();

  children
    .filter((v) => !!v)
    .forEach((child) => {
      if (typeof child === "string") {
        fragment.appendChild(document.createTextNode(child.toString()));
      } else {
        fragment.appendChild(child as Node);
      }
    });

  return fragment;
}

export const div = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("div", props, ...children);
export const span = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("span", props, ...children);

export const h1 = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("h1", props, ...children);
export const p = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("p", props, ...children);
export const code = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("code", props, ...children);

export const a = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("a", props, ...children);
export const button = (
  props: { [key: string]: string },
  ...children: ToHTML[]
) => createElement("button", props, ...children);

export const img = (props: { [key: string]: string }, ...children: ToHTML[]) =>
  createElement("img", props, ...children);

export const br = () => createElement("br", {});
