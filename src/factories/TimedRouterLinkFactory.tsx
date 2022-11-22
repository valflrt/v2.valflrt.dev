import TimedRouterLink, {
  TimedRouterLinkProps,
} from "../particles/TimedRouterLink";

const TimedRouterLinkFactory = <T extends Omit<TimedRouterLinkProps, "to">>(
  customProps: T
) => {
  function CustomTimedRouterLink(props: TimedRouterLinkProps) {
    return <TimedRouterLink {...customProps} {...props} />;
  }
  return CustomTimedRouterLink;
};

export default TimedRouterLinkFactory;
