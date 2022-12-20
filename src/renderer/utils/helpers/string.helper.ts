export const titleCase = (val: string) =>
  val
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map((str, index) =>
      index == 0
        ? str.replace(str.charAt(0), str.charAt(0).toUpperCase())
        : str.toLowerCase(),
    )
    .join(' ');
