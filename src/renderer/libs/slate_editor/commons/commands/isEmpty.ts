import type { Descendant, Editor } from 'slate';

import { isElementEmpty, isNodeEmpty } from './isNodeEmpty';

export function isEmpty(editor: Editor): boolean {
  if (editor.children.length === 0) {
    return true;
  }

  if (editor.children.length === 1) {
    return isNodeEmpty(editor, editor.children[0]);
  }

  return false;
}
export function isEmptyElements(elements: Descendant[]): boolean {
  if (elements.length === 0) {
    return true;
  }

  if (elements.length === 1) {
    return isElementEmpty(elements[0]);
  }

  return false;
}
