import RouterLink, { RouterLinkProps } from "../particles/RouterLink";

const RouterLinkFactory = <T extends Omit<RouterLinkProps, "to">>(
  customProps: T
) => {
  function CustomRouterLink(props: RouterLinkProps) {
    return <RouterLink {...customProps} {...props} />;
  }
  return CustomRouterLink;
};

export default RouterLinkFactory;
