export type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  toDo: () => any;
  toAwait?: (resolve: (value?: unknown) => void) => void;
};

export default function BaseButton(props: BaseButtonProps) {
  let { toDo, toAwait, ...filteredProps } = props;

  let handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (props.toAwait) await new Promise(props.toAwait);
    toDo();
  };

  return <button onClick={handleClick} {...filteredProps} />;
}
