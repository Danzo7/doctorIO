import { color } from '@assets/styles/color';
import { cmToPx } from '@helpers/math.helper';
import { withLayout } from '@libs/slate_editor/commons/normilazation/withLayout';
import EditorElement from '@libs/slate_editor/components/editor_element';
import EditorLeaf from '@libs/slate_editor/components/editor_leaf';
import EditorToolbar from '@libs/slate_editor/components/editor_toolbar';
import { withDynamicContent } from '@libs/slate_editor/dynamic_block/withDynamicContent';
import { withImages } from '@libs/slate_editor/slate-image';
import { withSuggestion } from '@libs/slate_editor/slate-suggestion/withSuggest';
import { onKeyDown, withTables } from '@libs/slate_editor/slate-tables';
import { useCallback, useMemo } from 'react';
import { createEditor, Element } from 'slate';
import { withHistory } from 'slate-history';
import './style/index.scss';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';

interface TemplateEditorProps {
  initialValue: Element[];
}
const paperSize = { width: 14.8, height: 21 };
const margins = { top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 };
const CHARACTERS = [
  'patient.fname',
  'patient.lname',
  'patient.lname',
  'patient.mname',
];

export default function TemplateEditor({ initialValue }: TemplateEditorProps) {
  const editor = useMemo(
    () =>
      withImages(
        withLayout(
          withDynamicContent(
            withTables(withSuggestion(withHistory(withReact(createEditor())))),
          ),
        ),
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
    <div className="template-editor">
      <Slate editor={editor} value={initialValue}>
        <EditorToolbar />
        <div className="editable-container">
          <Editable
            css={{
              width: cmToPx(paperSize.width),
              height: cmToPx(paperSize.height),
              maxHeight: cmToPx(paperSize.height),
              padding: `${cmToPx(margins.top)}px ${cmToPx(
                margins.right,
              )}px ${cmToPx(margins.bottom)}px ${cmToPx(margins.left)}px`,
              boxShadow: '0 0 5px 3px ' + color.darker,
              display: 'flex',
              flexDirection: 'column',
            }}
            placeholder="Write something..."
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            autoFocus
            onKeyDown={(e) => {
              onKeyDown(e, editor);
            }}
            id="text-editor"
          />
        </div>
      </Slate>
    </div>
  );
}
