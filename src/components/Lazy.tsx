import { useState, useEffect } from "react";

export interface LazyProps {
  importPromise: () => Promise<{ default: (props: any) => JSX.Element }>;
  loadStart?: () => unknown;
  loadEnd?: () => unknown;
}

/**
 * Similar to React.lazy but if there are hooks included in
 * the component you want to render, it will throw an error.
 */
export default function Lazy(props: LazyProps) {
  let { importPromise, loadStart, loadEnd, ...elementProps } = props;

  let [Element, setElement] = useState<((props: any) => JSX.Element) | null>(
    null
  );

  useEffect(() => {
    if (loadStart) loadStart();
    importPromise().then((i) => {
      if (loadEnd) loadEnd();
      setElement(() => i.default);
    });
  }, [importPromise]);

  return Element ? <Element {...elementProps} /> : null;
}
