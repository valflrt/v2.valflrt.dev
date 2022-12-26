import { Link, LinkProps, useMatch, useNavigate } from "react-router-dom";

export type DelayedRouterLinkProps = Omit<
  LinkProps,
  "onClick" | "to" | "className"
> & {
  to: string;
  timeout?: number;
  onTimeoutStart?: () => any;
  onTimeoutEnd?: () => any;
  className?: string | ((isFocused: boolean) => string);
};

// Used to create a link that has a timeout before redirect
export default function DelayedRouterLink(props: DelayedRouterLinkProps) {
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

  let handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isFocused) return;
    if (onTimeoutStart) onTimeoutStart();
    setTimeout(() => {
      if (onTimeoutEnd) onTimeoutEnd();
      navigate(to);
    }, timeout ?? 1e3);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
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
