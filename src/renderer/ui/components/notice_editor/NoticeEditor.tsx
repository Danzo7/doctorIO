import EditorElement from '@libs/slate_editor/components/editor_element';
import EditorLeaf from '@libs/slate_editor/components/editor_leaf';
import { withSuggestion } from '@libs/slate_editor/slate-suggestion/withSuggest';
import { useMemo, useCallback } from 'react';
import { Editor, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  withReact,
  RenderLeafProps,
  RenderElementProps,
  Slate,
  Editable,
} from 'slate-react';
import './style/index.scss';
import { color } from '@assets/styles/color';
import {
  nodeToPlain,
  painToDescendants,
} from '@libs/slate_editor/serializers/nodeToPlain';
interface NoticeEditorProps {
  onChange?: (value: string) => void;
  mentions?: string[];
  defaultValue?: string;
}
export const withForceWhite = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if ('text' in node && node.color !== color.white) {
      Transforms.setNodes(editor, { color: color.white }, { at: path });
    }
    normalizeNode([node, path]);
  };
  return editor;
};
export default function NoticeEditor({
  onChange: onChanged,
  mentions = ['ee'],
  defaultValue,
}: NoticeEditorProps) {
  const editor = useMemo(
    () =>
      withForceWhite(
        withSuggestion(withHistory(withReact(createEditor())), {
          suggestions: mentions,
          keyword: '@',
        }),
      ),
    [mentions],
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
    <div className="notice-editor">
      <Slate
        editor={editor}
        value={
          defaultValue
            ? painToDescendants(defaultValue, { color: color.white })
            : [
                {
                  type: 'p',
                  children: [{ text: '', color: color.white }],
                },
              ]
        }
        onChange={(value) => {
          onChanged?.(nodeToPlain(value));
        }}
      >
        {/* <EditorToolbar /> */}
        <div className="editable-container">
          <Editable
            className="editor"
            placeholder="Write something..."
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            autoFocus
          />
        </div>
      </Slate>
    </div>
  );
}
