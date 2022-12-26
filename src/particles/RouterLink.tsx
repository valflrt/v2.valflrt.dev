import { Link, LinkProps, useMatch } from "react-router-dom";

export type RouterLinkProps = Omit<LinkProps, "className"> & {
  className: (isFocused: boolean) => string;
};

export default function RouterLink(props: RouterLinkProps) {
  let { className, ...filteredProps } = props;
  let isFocused = !!useMatch({ path: props.to.toString(), end: true });

  return (
    <Link
      className={className ? className(isFocused) : undefined}
      {...filteredProps}
    />
  );
}
