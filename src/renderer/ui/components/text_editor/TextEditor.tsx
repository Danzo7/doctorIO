import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
  ReactEditor,
} from 'slate-react';
import './style/index.scss';
import { useCallback, useMemo } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Range, Editor, Transforms } from 'slate';
import { CustomElement } from './slate.types';
import EditorToolbar from './components/editor_toolbar';
import Tooltip from '@components/poppers/tooltip';
import { Overlay_u, modal } from '@stores/overlayStore';
import EditorLeaf from './components/editor_leaf';
import EditorElement from './components/editor_element';
import { withImages, withMentions, withTables } from './helper';

interface TextEditorProps {
  initialValue: CustomElement[];
}

const CHARACTERS = [
  'patient.fname',
  'patient.lname',
  'patient.lname',
  'Admiral Firmus Piett',
  'Admiral Gial Ackbar',
];

export default function TextEditor({ initialValue }: TextEditorProps) {
  const editor = useMemo(
    () =>
      withImages(
        withTables(withMentions(withHistory(withReact(createEditor())))),
      ),
    [],
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <EditorLeaf {...props} />,
    [],
  );
  const renderElement = useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    [],
  );

  return (
    <div className="text-editor">
      <Slate
        editor={editor}
        value={initialValue}
        onChange={() => {
          const { selection } = editor;

          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, { unit: 'word' });
            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeText =
              beforeRange && Editor.string(editor, beforeRange);
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
            const after = Editor.after(editor, start);
            const afterRange = Editor.range(editor, start, after);
            const afterText = Editor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
              const actionList = CHARACTERS.filter((c) =>
                c.toLowerCase().startsWith(beforeMatch[1].toLowerCase()),
              )
                .slice(0, 3)
                .map((char) => ({
                  text: char,
                  onPress: () => {
                    Transforms.select(editor, beforeRange);
                    //get element before
                    const prev = Editor.leaf(editor, beforeRange)[0];
                    const element: CustomElement = {
                      type: 'tag',
                      tag: char,
                      children: [{ ...prev, text: ' ' }],
                      inline: true,
                      void: true,
                    };
                    const empty: CustomElement = {
                      type: 'empty',
                      children: [{ ...prev, text: ' ' }],
                      inline: true,
                    };
                    Transforms.insertNodes(editor, [element, empty], {
                      voids: true,
                    });
                    Transforms.move(editor);
                  },
                }));
              if (actionList.length === 0) {
                Overlay_u.close('honobri');
                return;
              }
              const domRange = ReactEditor.toDOMRange(editor, beforeRange);
              const rect = domRange.getBoundingClientRect();

              modal(
                <Tooltip actionList={actionList} />,
                {
                  position: {
                    top: rect.top + window.pageYOffset + 24,
                    left: rect.left + window.pageXOffset + 24,
                  },
                  clickThrough: true,
                  closeOnClickOutside: true,
                  closeOnBlur: true,
                  backdropColor: false,
                  autoFocus: false,
                },
                'honobri',
              ).open({ force: true });
              return;
            } else {
              Overlay_u.close('honobri');
            }
          }
        }}
      >
        <EditorToolbar />
        <div className="editable-container">
          <div className="editable-content">
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              autoFocus
            />
          </div>
        </div>
      </Slate>
    </div>
  );
}
