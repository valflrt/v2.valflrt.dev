import {
  Link,
  LinkProps,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import routes from "../assets/routes";

export type DelayedRouterLinkProps = Omit<
  LinkProps,
  "onClick" | "to" | "className"
> & {
  to: string;
  timeout?: number;
  onTimeoutStart?: (d: number) => any;
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

  let location = useLocation();
  let d =
    routes.findIndex((r) => to === r.path) -
    routes.findIndex((r) => location.pathname === r.path);

  let handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isFocused) return;
    if (onTimeoutStart) onTimeoutStart(d);
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
