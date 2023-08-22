import { replaceClass } from "./util";

let hideTimeout: number | null = null;

function hideToast(toast: HTMLElement) {
  return setTimeout(() => {
    replaceClass(toast, "visible", "hidden");
    toast.classList.remove("bounce");
  }, 2000);
}

// TODO Implement toast kind (with colors)
export function toast(text: string, kind: "success" | "error" = "success") {
  let toast = document.getElementById("toast")!;
  if (toast.classList.contains("visible")) {
    toast.innerHTML = text;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = hideToast(toast);
  } else {
    replaceClass(toast, "hidden", "visible");
    toast.innerHTML = text;
    hideTimeout = hideToast(toast);
  }
}
