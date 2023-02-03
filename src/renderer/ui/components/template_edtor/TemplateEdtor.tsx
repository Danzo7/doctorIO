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
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import TextButton from '@components/buttons/text_button';
import usePrompt from '@libs/HistoryBlocker';
import { Element } from 'slate';
import {
  useGetPrintTemplateQuery,
  useSetPrintTemplateMutation,
} from '@redux/clinic/templates/templatesApi';
import LoadingSpinner from '@components/loading_spinner';
import { CommonEditor } from '@libs/slate_editor/commons/CommonEditor';

const paperSize = { width: 14.8, height: 21 };
const margins = { top: 1, bottom: 0, left: 1, right: 1 };
const letterSpacing = 4;
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

  const { data, isLoading, isSuccess } = useGetPrintTemplateQuery();
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
  const [update, res] = useSetPrintTemplateMutation();
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
          disabled={res.isLoading}
          onPress={async () => {
            if (newValue.current)
              update({
                template: newValue.current,
              })
                .unwrap()
                .then(() => {
                  oldValue.current = newValue.current;

                  setIsDirty(false);
                });
          }}
        />
      </SnakeBarActionsControls>
    ),
    isDirty,
    isDirty,
  );
  const currentTemplate =
    isSuccess && CommonEditor.isValidDesendants(data.template)
      ? data.template
      : CommonEditor.initElement();
  return (
    <div className="template-editor">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Slate
          editor={editor}
          value={currentTemplate}
          onChange={(value) => {
            setIsDirty(
              JSON.stringify(currentTemplate) != JSON.stringify(value),
            );
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
      )}
    </div>
  );
}
