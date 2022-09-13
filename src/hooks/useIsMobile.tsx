import { useState } from "react";

import useWindowEvent from "./useWindowEvent";

let useIsMobile = () => {
  let condition = () => window.innerWidth < 700;

  let [isMobile, setIsMobile] = useState(condition());

  useWindowEvent("resize", () => setIsMobile(condition()));

  return isMobile;
};

export default useIsMobile;
