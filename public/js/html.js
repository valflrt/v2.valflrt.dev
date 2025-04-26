/// <reference path="../../index.d.ts" />

/**
 * Creates a DOM element.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {TagPropsMap[K]} [props]
 * @param  {...NodeOrFalsy} [children]
 * @returns {HTMLElementTagNameMap[K]}
 */
export function createElement(tag, props, ...children) {
  let element = document.createElement(tag);

  if (!!props)
    Object.entries(props).forEach((pair) => {
      let [k, v] = pair;
      element.setAttribute(k, v);
    });

  if (!!children)
    children
      .filter((v) => !!v)
      .forEach((child) => {
        if (typeof child === "string") {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });

  return element;
}

/**
 * Unit element: acts like a container for other
 * elements. Similar to `<></>` in react.
 * @param  {...NodeOrFalsy} children
 * @returns {DocumentFragment}
 */
export function unit(...children) {
  let fragment = document.createDocumentFragment();

  children
    .filter((v) => !!v)
    .forEach((child) => {
      if (typeof child === "string") {
        fragment.appendChild(document.createTextNode(child.toString()));
      } else {
        fragment.appendChild(child);
      }
    });

  return fragment;
}

/**
 * Creates a div element.
 * @param {HTMLDivElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLDivElement}
 */
export const div = (props, ...children) =>
  createElement("div", props, ...children);
/**
 * Creates a span element.
 * @param {HTMLSpanElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLSpanElement}
 */
export const span = (props, ...children) =>
  createElement("span", props, ...children);

/**
 * Creates a h1 element.
 * @param {HTMLHeadingElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLHeadingElement}
 */
export const h1 = (props, ...children) =>
  createElement("h1", props, ...children);
/**
 * Creates a p element.
 * @param {HTMLParagraphElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLParagraphElement}
 */
export const p = (props, ...children) => createElement("p", props, ...children);
/**
 * Creates a code element.
 * @param {HTMLElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLElement}
 */
export const code = (props, ...children) =>
  createElement("code", props, ...children);

/**
 * Creates a a element.
 * @param {HTMLAnchorElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLAnchorElement}
 */
export const a = (props, ...children) => createElement("a", props, ...children);
/**
 * Creates a button element.
 * @param {HTMLButtonElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLButtonElement}
 */
export const button = (props, ...children) =>
  createElement("button", props, ...children);

/**
 * Creates a img element.
 * @param {HTMLImageElement} props
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLImageElement}
 */
export const img = (props, ...children) =>
  createElement("img", props, ...children);

/**
 * Creates a br element.
 * @returns {HTMLBRElement}
 */
export const br = () => createElement("br");
