import { Editor, Point, Range, Element, Transforms, NodeEntry } from 'slate';
import {
  CustomEditor,
  CustomElement,
  FormattedText,
  TABLE_TYPES,
} from './slate.types';

export const elementIsEmpty = (element: CustomElement) => {
  return (
    !TABLE_TYPES.includes(element.type as typeof TABLE_TYPES[number]) &&
    'children' in element &&
    element.children.length === 1 &&
    (element.children[0] as FormattedText).text === ''
  );
};
export const withMentions = (editor: CustomEditor) => {
  const { isInline, isVoid, markableVoid } = editor;

  editor.isInline = (element) => {
    return element.inline ?? isInline(element);
  };

  editor.isVoid = (element) => {
    return element.void ?? isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.inline ?? markableVoid(element);
  };

  return editor;
};

export const withTables = (editor: CustomEditor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n as any).type === 'td',
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };
  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n as any).type === 'td',
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};
export const enforceType = (
  editor: CustomEditor,
  [child, childPath]: NodeEntry<CustomElement>,
  type: Pick<CustomElement, 'type'>['type'],
) => {
  if (Element.isElement(child) && child.type !== type) {
    const newProperties: Partial<CustomElement> = { type };
    Transforms.setNodes<CustomElement>(editor, newProperties, {
      at: childPath,
    });
  }
};
export const withLayout = (editor: CustomEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    const lastChild = editor.children[editor.children.length - 1];
    if (Element.isElement(lastChild) && lastChild.type === 'table') {
      const paragraph: CustomElement = {
        type: 'p',
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, paragraph);
      return normalizeNode([node, path]);
    }
  };

  return editor;
};

export const insertImage = (editor: CustomEditor, url: string) => {
  const text = { text: '' };
  const image: CustomElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const withImages = (editor: CustomEditor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.void ?? isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url as any);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (text) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
