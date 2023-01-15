import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import './style/index.scss';
import { useCallback, useMemo } from 'react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import { CustomElement } from './slate.types';
import EditorToolbar from './components/editor_toolbar';
import EditorLeaf from './components/editor_leaf';
import EditorElement from './components/editor_element';
import { onKeyDown, withTables } from './slate-tables';
import { withImages } from './slate-image';
import { cmToPx } from '@helpers/math.helper';
import { withLayout } from './commons/normilazation/withLayout';
import { withSuggestion } from './slate-suggestion/withSuggest';
import { color } from '@assets/styles/color';
import { withDynamic } from './dynamic_block/withDynamic';

interface TextEditorProps {
  initialValue: CustomElement[];
}
const paperSize = { width: 14.8, height: 21 };
const margins = { top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 };
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
        withLayout(
          withDynamic(
            withTables(
              withSuggestion(withHistory(withReact(createEditor())), {
                suggestions: CHARACTERS,
                keyword: '/',
              }),
            ),
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
    <div className="text-editor">
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
