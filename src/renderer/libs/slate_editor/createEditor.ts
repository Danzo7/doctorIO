import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { Editor, createEditor as ce, Location } from 'slate';
import { CommonEditor } from './commons/CommonEditor';
import { TEXT_MARK_TYPES } from './slate.types';

export const createEditor = () => {
  const editor = withHistory(withReact(ce()));
  Object.assign(editor, {
    ...CommonEditor,
    recoverMarks: (from: Location) => {
      const [previousLeaf] = Editor.leaf(editor, from);
      Object.entries(previousLeaf).filter(([key, val]) => {
        if (TEXT_MARK_TYPES.includes(key as any)) {
          Editor.addMark(editor, key, val);
        }
      });
    },
  });
  return editor;
};
export type AddonEditor = {
  recoverMarks: (from: Location) => void;
};
