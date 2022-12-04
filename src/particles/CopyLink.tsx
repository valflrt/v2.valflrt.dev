import toast from "react-hot-toast";

import BaseLink, { BaseLinkProps } from "./BaseLink";

export type CopyLinkProps = Omit<BaseLinkProps, "onClick" | "toDo"> & {
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

  return <BaseLink toDo={toDo} {...filteredProps} />;
}
