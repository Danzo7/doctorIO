import { BLOCK_TYPE } from '@components/text_editor/slate.types';
import { isBlockActive } from './isBlockActive';
import { Editor, Element, Transforms } from 'slate';

export const toggleBlock = (
  editor: Editor,
  format: typeof BLOCK_TYPE[number],
) => {
  const isActive = isBlockActive(editor, format);

  const newProperties: Partial<Element> = {
    type: isActive ? 'p' : format,
  };
  Transforms.setNodes<Element>(editor, newProperties);
};
