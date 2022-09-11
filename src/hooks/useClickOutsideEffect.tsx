import useWindowEvent from "./useWindowEvent";

let useClickOutsideEffect = <refElementType extends HTMLElement>(
  callback: (event: MouseEvent) => any,
  excludeRefs: React.RefObject<refElementType>[]
) => {
  let handleClickOutside = (e: MouseEvent) => {
    if (
      excludeRefs
        .map((ref) => !ref.current || !ref.current.contains(e.target as Node))
        .every((i) => !!i)
    )
      callback(e);
  };

  useWindowEvent("mouseup", handleClickOutside);
};

export default useClickOutsideEffect;
