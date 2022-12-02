export type LinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, "onClick"> & {
  to: string;
};

export default function Link(props: LinkProps) {
  let { to, ...filteredProps } = props;
  return <a href={to} {...filteredProps}></a>;
}
