import { color } from '@assets/styles/color';
import { cmToPx } from '@helpers/math.helper';
import { withLayout } from '@libs/slate_editor/commons/normilazation/withLayout';
import EditorElement from '@libs/slate_editor/components/editor_element';
import EditorLeaf from '@libs/slate_editor/components/editor_leaf';
import EditorToolbar from '@libs/slate_editor/components/editor_toolbar';
import { withDynamicContent } from '@libs/slate_editor/dynamic_block/withDynamicContent';
import { withImages } from '@libs/slate_editor/slate-image';
import { onKeyDown, withTables } from '@libs/slate_editor/slate-tables';
import { useCallback, useMemo, useRef, useState } from 'react';
import './style/index.scss';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
} from 'slate-react';
import { withDynamicAttributes } from '@libs/slate_editor/slate-dynamic-attributes/withDynamicAttributes';
import { createEditor } from '@libs/slate_editor/createEditor';
import { useTemplateStore } from '@stores/templateStore';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import TextButton from '@components/buttons/text_button';
import usePrompt from '@libs/HistoryBlocker';
import { Element } from 'slate';

const paperSize = { width: 14.8, height: 21 };
const margins = { top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 };

interface TemplateEditorProps {}
export default function TemplateEditor({}: TemplateEditorProps) {
  const editor = useMemo(
    () =>
      withImages(
        withLayout(
          withDynamicContent(withTables(withDynamicAttributes(createEditor()))),
        ),
      ),
    [],
  );

  const { desendants } = useTemplateStore.getState();
  const newValue = useRef<Element[]>();
  const oldValue = useRef<Element[]>();
  const [isDirty, setIsDirty] = useState(false);

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <EditorLeaf {...props} />,
    [],
  );
  const renderElement = useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    [],
  );

  usePrompt(
    'Careful : you have unsaved changes !',
    () => (
      <SnakeBarActionsControls>
        <TextButton
          text="reset"
          afterBgColor={color.darker}
          onPress={() => {
            if (oldValue.current) editor.children = oldValue.current;
            oldValue.current = undefined;
            setIsDirty(false);
          }}
        />
        <TextButton
          text="Save changes"
          backgroundColor={color.good_green}
          onPress={async () => {
            if (newValue.current)
              useTemplateStore.getState().setDesendants(newValue.current);
            oldValue.current = newValue.current;

            setIsDirty(false);
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
    isDirty,
  );
  return (
    <div className="template-editor">
      <Slate
        editor={editor}
        value={desendants}
        onChange={(value) => {
          setIsDirty(JSON.stringify(desendants) != JSON.stringify(value));
          if (isDirty) newValue.current = value as any;
          if (!oldValue.current) oldValue.current = value as any;
        }}
      >
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
