import { Node } from 'slate';
import { CustomText, TextElement } from '../../slate.types';

export const isTextNode = (
  node: Node,
): node is TextElement & { children: CustomText[] } => {
  return 'children' in node && 'text' in node.children[0];
};
