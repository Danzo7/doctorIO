import { useSlate } from 'slate-react';
import { Element, Editor, Transforms } from 'slate';
import './style/index.scss';
import {
  BLOCK_TYPE,
  CustomEditor,
  CustomElement,
  TABLE_TYPES,
  TEXT_ALIGN_TYPES,
  TEXT_FORMAT_TYPES,
} from '@components/text_editor/slate.types';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { color } from '@assets/styles/color';
import BoldIcon from 'toSvg/text_bold.svg?icon';
import ItalicIcon from 'toSvg/text_italic.svg?icon';
import UnderlineIcon from 'toSvg/text_underline.svg?icon';
import Increase from 'toSvg/text_increase.svg?icon';
import Decrease from 'toSvg/text_decrease.svg?icon';
import AlignLeft from 'toSvg/text_left.svg?icon';
import AlignCenter from 'toSvg/text_center.svg?icon';
import AlignRight from 'toSvg/text_right.svg?icon';
import TableIcon from 'toSvg/text_table.svg?icon';
import AddImage from 'toSvg/add_image.svg?icon';
import InputWrapper from '@components/inputs/input_wrapper';
import AutoSizeInput from '@components/inputs/auto_size_input';
import { TablesEditor } from '@components/text_editor/slate-tables';
import { ImageEditor } from '@components/text_editor/slate-image/ImageEditor';

interface EditorToolbarProps {}
const isBlockActive = (
  editor: CustomEditor,
  format: typeof BLOCK_TYPE[number],
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};
const isAlignActive = (
  editor: CustomEditor,
  format: typeof TEXT_ALIGN_TYPES[number],
) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        ((n as CustomElement).align === format ||
          (!n.align &&
            format === 'left' &&
            !TABLE_TYPES.includes(n.type as any))),
    }),
  );
  return !!match;
};
const toggleAlign = (
  editor: CustomEditor,
  format: typeof TEXT_ALIGN_TYPES[number],
) => {
  const isActive = isAlignActive(editor, format);
  const newProperties: Partial<Element> = {
    align: isActive ? undefined : format,
  };
  Transforms.setNodes<Element>(editor, newProperties);
};

const toggleBlock = (
  editor: CustomEditor,
  format: typeof BLOCK_TYPE[number],
) => {
  const isActive = isBlockActive(editor, format);

  const newProperties: Partial<Element> = {
    type: isActive ? 'p' : format,
  };
  Transforms.setNodes<Element>(editor, newProperties);
};

const isMarkActive = (
  editor: CustomEditor,
  format: typeof TEXT_FORMAT_TYPES[number],
) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
const getTextSize = (editor: CustomEditor) => {
  return Editor.marks(editor)?.fontSize ?? 12;
};
const toggleMark = (
  editor: CustomEditor,
  format: typeof TEXT_FORMAT_TYPES[number],
) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
const changeSize = (editor: CustomEditor, action: 'increase' | 'decrease') => {
  const current = Editor.marks(editor)?.fontSize ?? 12;
  if (action === 'decrease' && current >= 8)
    Editor.addMark(editor, 'fontSize', current - 1);
  else if (action === 'increase' && current <= 128)
    Editor.addMark(editor, 'fontSize', current + 1);
};

export default function EditorToolbar({}: EditorToolbarProps) {
  const editor = useSlate();
  // const editorStatic = useSlateStatic();
  return (
    <div className="editor-toolbar">
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          changeSize(editor, 'increase');
        }}
        unFocusable
        iconColor={color.white}
        Icon={Increase}
      />
      <InputWrapper height={'auto'} radius={0} padding={2}>
        <AutoSizeInput
          type="number"
          value={getTextSize(editor)}
          onChange={(e) => {
            if (
              isNaN(Number(e.target.value)) ||
              Number(e.target.value) > 128 ||
              Number(e.target.value) < 8
            )
              return e;
            else Editor.addMark(editor, 'fontSize', Number(e.target.value));
          }}
        />
      </InputWrapper>
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          changeSize(editor, 'decrease');
        }}
        unFocusable
        iconColor={color.white}
        Icon={Decrease}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          toggleMark(editor, 'bold');
        }}
        unFocusable
        iconColor={isMarkActive(editor, 'bold') ? color.white : color.light}
        Icon={BoldIcon}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          toggleMark(editor, 'italic');
        }}
        unFocusable
        iconColor={isMarkActive(editor, 'italic') ? color.white : color.light}
        Icon={ItalicIcon}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          toggleMark(editor, 'underline');
        }}
        unFocusable
        iconColor={
          isMarkActive(editor, 'underline') ? color.white : color.light
        }
        Icon={UnderlineIcon}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          TablesEditor.insertTable(editor);
        }}
        unFocusable
        iconColor={color.white}
        Icon={TableIcon}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          toggleAlign(editor, 'left');
        }}
        unFocusable
        iconColor={isAlignActive(editor, 'left') ? color.white : color.light}
        Icon={AlignLeft}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          toggleAlign(editor, 'center');
        }}
        unFocusable
        iconColor={isAlignActive(editor, 'center') ? color.white : color.light}
        Icon={AlignCenter}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          toggleAlign(editor, 'right');
        }}
        unFocusable
        iconColor={isAlignActive(editor, 'right') ? color.white : color.light}
        Icon={AlignRight}
      />
      <SquareIconButton
        onMouseDown={(event) => {
          event?.preventDefault();
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/png, image/jpeg';

          input.click();
          input.onchange = (_) => {
            const files: FileList = input.files as FileList;
            const file = URL.createObjectURL(files[0]);
            ImageEditor.insertImage(editor, file);
          };
        }}
        unFocusable
        Icon={AddImage}
      />
    </div>
  );
}
