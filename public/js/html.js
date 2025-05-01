/// <reference path="../../index.d.ts" />

/**
 * Appends children to a node, note that children can be either
 * a `string`, a `Node`, or a `Promise<Node>`.
 * @param {Node} node
 * @param  {NodeOrFalsy[]} children
 */
function appendChildren(node, children) {
  children
    .filter((v) => !!v)
    .forEach((child) => {
      if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        node.appendChild(child);
      } else if (child instanceof Promise) {
        let placeHolder = document.createComment("loading...");
        node.appendChild(placeHolder);
        child.then((resolvedChild) => {
          placeHolder.parentNode.replaceChild(resolvedChild, placeHolder);
        });
      }
    });
}

/**
 * Creates a DOM element.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {TagPropsMap[K]} [props]
 * @param  {...NodeOrFalsy} children
 * @returns {HTMLElementTagNameMap[K]}
 */
export function createElement(tag, props, ...children) {
  let element = document.createElement(tag);

  if (!!props)
    Object.entries(props).forEach((pair) => {
      let [k, v] = pair;
      element.setAttribute(k, v);
    });

  appendChildren(element, children);

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

  appendChildren(fragment, children);

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
