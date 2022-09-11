import useWindowEvent from "./useWindowEvent";

export interface WheelStepEvent {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

export interface WheelStepEventOptions {
  // Delay between two event calls
  delay?: number;
}

function useWheelStep(
  listener: (event: WheelStepEvent) => unknown,
  options?: WheelStepEventOptions
) {
  let last = Date.now();
  useWindowEvent("wheel", (e) => {
    if (Date.now() - last > (options?.delay ?? 0)) {
      last = Date.now();
      listener({
        // Whether the x axis was affected or not
        x: e.deltaX !== 0 ? (e.deltaX > 0 ? 1 : -1) : 0,

        // Whether the y axis was affected or not
        y: e.deltaY !== 0 ? (e.deltaY > 0 ? 1 : -1) : 0,
      });
    }
  });
}

export default useWheelStep;
