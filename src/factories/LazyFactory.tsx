import Lazy, { LazyProps } from "../components/Lazy";

const LazyFactory = <T extends Partial<LazyProps>>(customProps: T) => {
  function CustomLazy(props: Omit<LazyProps, keyof T>) {
    return <Lazy {...(customProps as LazyProps)} {...props} />;
  }
  return CustomLazy;
};

export default LazyFactory;
