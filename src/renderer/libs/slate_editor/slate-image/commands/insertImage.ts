import { CustomEditor, CustomElement } from '@libs/slate_editor/slate.types';
import { Transforms } from 'slate';

export const insertImage = (
  editor: CustomEditor,
  url: string,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
) => {
  const image: CustomElement = {
    type: 'image',
    url,
    children: [{ text: ' ' }],
    inline: true,
    void: true,
    width: width,
    height: height,
    mHeight: height,
    mWidth: width,
  };
  Transforms.insertNodes(editor, image);
};
