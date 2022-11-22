import { useMatch, useNavigate } from "react-router-dom";

import BaseLink, { BaseLinkProps } from "./BaseLink";

export type TimedRouterLinkProps = Omit<
  BaseLinkProps,
  "onClick" | "to" | "className" | "toDo"
> & {
  to: string;
  timeout?: number;
  onTimeoutStart?: () => any;
  onTimeoutEnd?: () => any;
  className?: string | ((isFocused: boolean) => string);
};

// Used to create a link that has a timeout before redirect
function TimedRouterLink(props: TimedRouterLinkProps) {
  let {
    to,
    timeout,
    onTimeoutStart,
    onTimeoutEnd,
    className,
    ...filteredProps
  } = props;

  let navigate = useNavigate();
  let isFocused = !!useMatch({ path: to, end: true });

  let toAwait = (r: () => void) => {
    if (isFocused) return;
    if (onTimeoutStart) onTimeoutStart();
    setTimeout(r, timeout ?? 1e3); // waits for custom timeout if specified or for 1s
  };

  let handleClick = () => {
    if (isFocused) return;
    if (onTimeoutEnd) onTimeoutEnd();
    navigate(to);
  };

  return (
    <BaseLink
      toDo={handleClick}
      toAwait={toAwait}
      className={
        className
          ? typeof className === "string"
            ? className
            : className(isFocused)
          : undefined
      }
      {...filteredProps}
    />
  );
}

export default TimedRouterLink;
