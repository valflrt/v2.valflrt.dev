export let omit = <T extends { [key: string]: any }, K extends string>(
  obj: T,
  key: K
): Omit<T, K> => {
  let { [key]: omitted, ...rest } = obj;
  return rest;
};

export let css = {
  /**
   * Joins class names
   * @param cns class names to join
   */
  join: (...cns: (string | null | undefined | false)[]) =>
    cns.filter((cn) => !!cn).join(" "),
};
