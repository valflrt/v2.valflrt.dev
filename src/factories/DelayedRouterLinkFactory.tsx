import DelayedRouterLink, {
  DelayedRouterLinkProps,
} from "../particles/DelayedRouterLink";

const DelayedRouterLinkFactory = <T extends Omit<DelayedRouterLinkProps, "to">>(
  customProps: T
) => {
  function CustomTimedRouterLink(props: DelayedRouterLinkProps) {
    return <DelayedRouterLink {...customProps} {...props} />;
  }
  return CustomTimedRouterLink;
};

export default DelayedRouterLinkFactory;
