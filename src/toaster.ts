import { replaceClass } from "./util";

let hideTimeout: number | null = null;

function hideToast(toast: HTMLElement) {
  return setTimeout(() => {
    replaceClass(toast, "visible", "hidden");
    toast.classList.remove("bounce", "color-success", "color-error");
  }, 2000);
}

export function toast(
  text: string,
  kind: "default" | "highlight" | "success" | "error" = "default"
) {
  let toast = document.getElementById("toast")!;
  if (kind !== "default") toast.classList.add(`color-${kind}`);
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
