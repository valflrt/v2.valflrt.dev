import useWindowEvent from "./useWindowEvent";

export interface TouchDirectionEvent {
  dx: number;
  dy: number;
}

function useTouchDirection(listener: (event: TouchDirectionEvent) => unknown) {
  useWindowEvent("touchstart", (start) => {
    let startCoord = {
      x: start.changedTouches[0].clientX,
      y: start.changedTouches[0].clientY,
    };

    let endListener: ["touchend", (e: WindowEventMap["touchend"]) => unknown] =
      [
        "touchend",
        (end) => {
          let endCoord = {
            x: end.changedTouches[0].clientX,
            y: end.changedTouches[0].clientY,
          };

          listener({
            dx: endCoord.x - startCoord.x,
            dy: endCoord.y - startCoord.y,
          });

          window.removeEventListener(...endListener);
        },
      ];
    window.addEventListener(...endListener);
  });
}

export default useTouchDirection;
