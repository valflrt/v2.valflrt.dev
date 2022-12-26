import toast from "react-hot-toast";

import BaseButton, { BaseButtonProps } from "./BaseButton";

export type CopyLinkProps = Omit<BaseButtonProps, "onClick" | "toDo"> & {
  textToCopy: string;
  notificationTimeout?: number;
};

// Used to create a link that copies some text to clipboard
export default function CopyLink(props: CopyLinkProps) {
  let { textToCopy, notificationTimeout, ...filteredProps } = props;

  let toDo = () => {
    navigator.clipboard.writeText(props.textToCopy).then(() => {
      toast.success("Copied !", { duration: notificationTimeout ?? 2e3 });
    });
  };

  return <BaseButton toDo={toDo} {...filteredProps} />;
}
