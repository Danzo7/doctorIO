import { Element } from 'slate';

export function* traverseElements<T extends Element>(
  children: T[],
): Generator<T> {
  for (const node of children) {
    if (Element.isElement(node) && 'children' in node) {
      yield node;
      yield* traverseElements(node.children as T[]);
    } else {
      yield node;
    }
  }
}
