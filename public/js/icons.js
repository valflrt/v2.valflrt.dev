/// <reference path="../../index.d.ts" />

// icons from https://simpleicons.org and https://feathericons.com/

const parser = new DOMParser();

/**
 * @type {Map<string, HTMLElement>}
 */
const cache = new Map();

/**
 * Returns the corresponding icon element.
 * @param {IconNames} name
 * @returns {Promise<HTMLElement>}
 */
export default async function icon(name) {
  if (cache.has(name)) {
    return cache.get(name).cloneNode(true);
  }

  let res = await fetch(`/icons/${name}.svg`);
  let svgString = await res.text();
  let svgElement = parser.parseFromString(
    svgString,
    "image/svg+xml",
  ).documentElement;

  cache.set(name, svgElement);

  return svgElement;
}
