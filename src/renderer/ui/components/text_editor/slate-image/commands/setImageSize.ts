import { Editor, Transforms } from 'slate';
import { ImageElement } from '../types';
import { ImageEditor } from '../ImageEditor';

export const setImageSize = (
  editor: Editor,

  element: ImageElement,
  { width, height }: { width?: number; height?: number },
) => {
  Transforms.setNodes(
    editor,
    { width, height },
    {
      match: (n) =>
        ImageEditor.isImageElement(n) && ImageEditor.isEqual(n, element),
    },
  );
};
