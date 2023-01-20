import EditorElement from '@libs/slate_editor/components/editor_element';
import EditorLeaf from '@libs/slate_editor/components/editor_leaf';
import { withSuggestion } from '@libs/slate_editor/slate-suggestion/withSuggest';
import { useMemo, useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import {
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
import { format } from 'date-fns';
import { SETTINGS } from '@stores/appSettingsStore';
import { createEditor } from '@libs/slate_editor/createEditor';
interface CertificateEditorProps {
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

export default function CertificateEditor({
  onChange: onChanged,
  mentions = [],
  defaultValue,
}: CertificateEditorProps) {
  const editor = useMemo(
    () =>
      withForceWhite(
        withSuggestion(createEditor(), {
          suggestions: ['at', 'me', ...mentions],
          keyword: '@',
          insertOnSelect(selected, prev) {
            const mappedText: { [key: string]: string } = {
              at: format(new Date(), SETTINGS.dateFormat),
              me: 'Dr. John Doe',
            };
            return {
              type: 'autofill',
              behavior: 'mention',
              children: [{ ...prev, text: mappedText[selected] ?? selected }],
              inline: true,
            };
          },
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
    <div className="certificate-editor">
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
