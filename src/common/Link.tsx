export type LinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, "onClick"> & {
  to: string;
};

function Link(props: LinkProps) {
  let { to, ...filteredProps } = props;
  return <a href={to} {...filteredProps}></a>;
}

export default Link;
