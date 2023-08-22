import { replaceClass } from "./util";

let hideTimeout: number | null = null;

export function toast(text: string) {
  let toast = document.getElementById("toast")!;
  if (toast.classList.contains("visible")) {
    toast.innerHTML = text;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(
      () => replaceClass(toast, "visible", "hidden"),
      2000
    );
  } else {
    replaceClass(toast, "hidden", "visible");
    toast.innerHTML = text;
    hideTimeout = setTimeout(
      () => replaceClass(toast, "visible", "hidden"),
      2000
    );
  }
}
