/// <reference path="../../index.d.ts" />

import { replaceOrAddClass } from "./util.js";

const toastEl = document.getElementById("toast");

const toastDuration = 2000;

let hideTimeout = null;

/**
 * Hides the toast element.
 * @returns {number}
 */
function hideToast() {
  return setTimeout(() => {
    replaceOrAddClass(toastEl, "visible", "hidden");
    toastEl.classList.remove("bounce", "color-success", "color-error");
  }, toastDuration);
}

/**
 * Displays a toast notification.
 * @param {string} text
 * @param {"default" | "highlight" | "success" | "error"} kind
 */
export default function toast(text, kind = "default") {
  if (kind !== "default") toastEl.classList.add(`color-${kind}`);
  if (toastEl.classList.contains("visible")) {
    toastEl.innerHTML = text;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = hideToast();
  } else {
    replaceOrAddClass(toastEl, "hidden", "visible");
    toastEl.innerHTML = text;
    hideTimeout = hideToast(toastEl);
  }
}
