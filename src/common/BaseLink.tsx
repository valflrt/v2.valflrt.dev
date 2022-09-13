export type BaseLinkProps = Omit<
  React.ButtonHTMLAttributes<HTMLDivElement>,
  "onClick"
> & {
  toDo: () => any;
  toAwait?: (resolve: (value?: unknown) => void) => void;
};

function BaseLink(props: BaseLinkProps) {
  let { toDo, toAwait, ...filteredProps } = props;

  let handleClick: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    if (props.toAwait) await new Promise(props.toAwait);
    toDo();
  };

  return <div onClick={handleClick} {...filteredProps} />;
}

export default BaseLink;
