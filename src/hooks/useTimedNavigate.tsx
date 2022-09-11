import { To, useNavigate, NavigateOptions } from "react-router-dom";

const useTimedNavigate = (hookOptions: {
  timeout?: number;
  onTimeoutStart?: () => unknown;
  onTimeoutEnd?: () => unknown;
}) => {
  let navigate = useNavigate();

  return (to: To, options?: NavigateOptions) => {
    if (hookOptions?.onTimeoutStart) hookOptions.onTimeoutStart();
    setTimeout(() => {
      navigate(to, options);
      if (hookOptions?.onTimeoutEnd) hookOptions.onTimeoutEnd();
    }, hookOptions?.timeout ?? 1e3);
  };
};

export default useTimedNavigate;
