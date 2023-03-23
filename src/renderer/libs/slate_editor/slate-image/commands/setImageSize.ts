import { Editor, Transforms } from 'slate';
import { ImageElement } from '../types';
import { isImageElement } from './isImageElement';
import { isEqual } from './isEqual';

export const setImageSize = (
  editor: Editor,

  element: ImageElement,
  props:
    | { width: number; height: number }
    | { width: number }
    | { height: number },
) => {
  const height =
    'height' in props
      ? props.height
      : Math.floor((props.width * element.mHeight) / element.mWidth);
  const width =
    'width' in props
      ? props.width
      : Math.floor((props.height * element.mWidth) / element.mHeight);

  Transforms.setNodes(
    editor,
    { mWidth: width, mHeight: height },
    {
      match: (n) => isImageElement(n) && isEqual(n, element),
    },
  );
};
export const setImageSizeByRatio = (
  editor: Editor,
  element: ImageElement,
  ratio: number,
) => {
  Transforms.setNodes(
    editor,
    {
      mWidth: element.width * ratio,
      mHeight: element.height * ratio,
    },
    {
      match: (n) => isImageElement(n) && isEqual(n, element),
    },
  );
};
export const resetOriginalSize = (editor: Editor, element: ImageElement) => {
  Transforms.setNodes(
    editor,
    { mWidth: element.width, mHeight: element.height },
    {
      match: (n) => isImageElement(n) && isEqual(n, element),
    },
  );
};
