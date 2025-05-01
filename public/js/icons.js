/// <reference path="../../index.d.ts" />

// icons from https://simpleicons.org and https://feathericons.com/

const iconParser = new DOMParser();

/**
 * Returns the corresponding icon element.
 * @param {IconNames} name
 * @returns {Promise<HTMLElement>}
 */
export default async function icon(name) {
  let res = await fetch(`/icons/${name}.svg`, { cache: "force-cache" });
  let svgString = await res.text();
  let svgElement = iconParser.parseFromString(
    svgString,
    "image/svg+xml",
  ).documentElement;

  return svgElement;
}
