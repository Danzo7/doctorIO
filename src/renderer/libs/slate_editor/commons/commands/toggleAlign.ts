import { TEXT_ALIGN_TYPES } from '@libs/slate_editor/slate.types';
import { Editor, Transforms, Element } from 'slate';
import { isAlignActive } from './isAlignActive';

export const toggleAlign = (
  editor: Editor,
  format: typeof TEXT_ALIGN_TYPES[number],
) => {
  const isActive = isAlignActive(editor, format);
  const newProperties: Partial<Element> = {
    align: isActive ? undefined : format,
  };
  Transforms.setNodes<Element>(editor, newProperties);
};
