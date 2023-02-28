import EditorElement from '@libs/slate_editor/components/editor_element';
import EditorLeaf from '@libs/slate_editor/components/editor_leaf';
import { withSuggestion } from '@libs/slate_editor/slate-suggestion/withSuggest';
import { useMemo, useCallback } from 'react';
import { Descendant } from 'slate';
import {
  RenderLeafProps,
  RenderElementProps,
  Slate,
  Editable,
} from 'slate-react';
import './style/index.scss';
import { color } from '@assets/styles/color';
import { format } from 'date-fns';
import { SETTINGS } from '@stores/appSettingsStore';
import { createEditor } from '@libs/slate_editor/createEditor';
import { CommonEditor } from '@libs/slate_editor/commons/CommonEditor';
import { withDynamicAttributes } from '@libs/slate_editor/slate-dynamic-attributes/withDynamicAttributes';
import EditorToolbar from '@libs/slate_editor/components/editor_toolbar';
interface CertificateEditorProps {
  onChange?: (value: Descendant[]) => void;
  mentions?: string[];
  defaultValue?: Descendant[];
  error?: string;
  readonly?: boolean;
}

export default function CertificateEditor({
  onChange: onChanged,
  mentions = [],
  error,
  defaultValue,
  readonly,
}: CertificateEditorProps) {
  const editor = useMemo(
    () =>
      withSuggestion(createEditor(), {
        suggestions: ['at', ...mentions],
        keyword: '@',
        insertOnSelect(selected, prev) {
          const mappedText: { [key: string]: string } = {
            at: format(new Date(), SETTINGS.dateFormat),
          };
          return {
            type: 'autofill',
            behavior: 'mention',
            children: [{ ...prev, text: mappedText[selected] ?? selected }],
            inline: true,
          };
        },
      }),

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
    <div className={`certificate-editor ${error ? 'error' : ''}`}>
      <Slate
        editor={editor}
        value={
          defaultValue && CommonEditor.isValidDesendants(defaultValue)
            ? defaultValue
            : [
                {
                  type: 'p',
                  children: [{ text: '', color: color.coldBlack }],
                },
              ]
        }
        onChange={(value) => {
          onChanged?.(value);
        }}
      >
        <div className="editable-container">
          <Editable
            className="editor"
            placeholder="Write something..."
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            autoFocus
            readOnly={readonly}
          />
        </div>
      </Slate>
      {error && (
        <div className="error-message">
          <span>
            {error ??
              (defaultValue && !CommonEditor.isValidDesendants(defaultValue)
                ? 'Invalid value'
                : '')}
          </span>
        </div>
      )}
    </div>
  );
}
export function CertificateModelsEditor({
  onChange: onChanged,
  error,
  defaultValue,
  readonly,
}: CertificateEditorProps) {
  const editor = useMemo(
    () => withDynamicAttributes(createEditor()),

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
    <div className={`certificate-editor ${error ? 'error' : ''}`}>
      <Slate
        editor={editor}
        value={
          defaultValue && CommonEditor.isValidDesendants(defaultValue)
            ? defaultValue
            : [
                {
                  type: 'p',
                  children: [{ text: '', color: color.coldBlack }],
                },
              ]
        }
        onChange={(value) => {
          onChanged?.(value);
        }}
      >
        <EditorToolbar items={['size', 'format', 'align', 'dynamic']} />
        <div className="editable-container">
          <Editable
            className="editor"
            placeholder="Write something..."
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            autoFocus
            readOnly={readonly}
          />
        </div>
      </Slate>
      {error && (
        <div className="error-message">
          <span>
            {error ??
              (defaultValue && !CommonEditor.isValidDesendants(defaultValue)
                ? 'Invalid value'
                : '')}
          </span>
        </div>
      )}
    </div>
  );
}
