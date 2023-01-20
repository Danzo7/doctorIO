import { Element } from 'slate';

export function mapElements<T extends Element>(
  children: T[],
  map: (node: T) => T,
): T[] {
  return children.map((node) => {
    const n = map(node);
    return {
      ...n,
      ...(Element.isElement(node)
        ? { children: mapElements(n.children as T[], map) }
        : {}),
    };
  });
}
