export const findByName = <T>(
  value: string,
  data: T[],
  key: keyof T,
  length?: number,
) => {
  const res = data
    .filter((el) =>
      typeof el[key] == 'string' && value.length > 0
        ? RegExp(`^${value.trim().replace(/\s\s+/g, ' ')}`, 'i').test(
            el[key] as string,
          )
        : false,
    )
    .slice(0, length ?? data.length);
  if (res.length > 0) {
    return res;
  } else return undefined;
};
