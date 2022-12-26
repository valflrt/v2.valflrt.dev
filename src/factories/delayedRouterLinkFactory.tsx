import DelayedRouterLink, {
  DelayedRouterLinkProps,
} from "../particles/DelayedRouterLink";

const delayedRouterLinkFactory = <T extends Omit<DelayedRouterLinkProps, "to">>(
  customProps: T
) => {
  function CustomDelayedRouterLink(props: DelayedRouterLinkProps) {
    return <DelayedRouterLink {...customProps} {...props} />;
  }
  return CustomDelayedRouterLink;
};

export default delayedRouterLinkFactory;
