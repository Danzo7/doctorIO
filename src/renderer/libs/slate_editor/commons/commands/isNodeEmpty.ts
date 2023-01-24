import type { Node, Editor, Descendant } from 'slate';
import { Text } from 'slate';

import { isVoid } from './isVoid';

export function isNodeEmpty(editor: Editor, node: Node, trim = false): boolean {
  if (Text.isText(node)) {
    return trim ? node.text.trim() === '' : node.text === '';
  }

  if (isVoid(editor, node)) {
    return false;
  }

  return (node.children as any)?.every((child: any) =>
    isNodeEmpty(editor, child, trim),
  );
}

export function isElementEmpty(node: Descendant, trim = false): boolean {
  if (Text.isText(node)) {
    return trim ? node.text.trim() === '' : node.text === '';
  }

  return (node.children as any)?.every((child: any) =>
    isElementEmpty(child, trim),
  );
}
