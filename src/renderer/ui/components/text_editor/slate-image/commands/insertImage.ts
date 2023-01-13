import {
  CustomEditor,
  CustomElement,
} from '@components/text_editor/slate.types';
import { Transforms } from 'slate';

export const insertImage = (editor: CustomEditor, url: string) => {
  const text = { text: ' ' };
  const image: CustomElement = {
    type: 'image',
    url,
    children: [text],
    inline: true,
    void: true,
    width: 250,
    height: 250,
  };
  Transforms.insertNodes(editor, image);
};
