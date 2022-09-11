import { useState, useEffect } from "react";

export type LazyProps = {
  importPromise: () => Promise<{ default: (props: any) => JSX.Element }>;
  loadStart?: () => unknown;
  loadEnd?: () => unknown;
};

function Lazy(props: LazyProps) {
  let { importPromise, loadStart, loadEnd } = props;

  let [element, setElement] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setElement(null);
    if (loadStart) loadStart();
    importPromise().then((i) => {
      if (loadEnd) loadEnd();
      setElement(i.default(props));
    });
  }, [importPromise]);

  return element;
}

export default Lazy;
