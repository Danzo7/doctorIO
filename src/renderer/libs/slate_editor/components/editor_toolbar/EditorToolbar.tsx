import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import './style/index.scss';

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
import TagIcon from 'toSvg/tag.svg?icon';
import InputWrapper from '@components/inputs/input_wrapper';
import AutoSizeInput from '@components/inputs/auto_size_input';
import { TablesEditor } from '@libs/slate_editor/slate-tables';
import {
  getFontSize,
  isAlignActive,
  isMarkActive,
  setFontSize,
  toggleAlign,
  toggleMark,
} from '@libs/slate_editor/commons/commands';
import TextButton from '@components/buttons/text_button';
import { modal, DEFAULT_MODAL } from '@libs/overlay';

import InsertAttributesModal from '@containers/modals/insert_attributes_modal';

import { AttributeEditor } from '@libs/slate_editor/slate-dynamic-attributes/AttributeEditor';
import ImageGallery from '@containers/modals/image_gallery';
import { ImageEditor } from '@libs/slate_editor/slate-image/ImageEditor';
import { createImage } from '@helpers/image.helper';
import { DEFAULT_AUTO_REF } from '@libs/slate_editor/constants';

interface EditorToolbarProps {}

export default function EditorToolbar({}: EditorToolbarProps) {
  const editor = useSlate();
  return (
    <div className="editor-toolbar">
      <div className="block">
        <SquareIconButton
          iconSize={15}
          onMouseDown={(event) => {
            event?.preventDefault();
            setFontSize(editor, 'increase');
          }}
          unFocusable
          iconColor={color.white}
          Icon={Increase}
        />
        <InputWrapper height={'auto'} radius={0} padding={2}>
          <AutoSizeInput
            type="number"
            value={getFontSize(editor)}
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
          iconSize={10}
          onMouseDown={(event) => {
            event?.preventDefault();
            setFontSize(editor, 'decrease');
          }}
          unFocusable
          iconColor={color.white}
          Icon={Decrease}
        />
      </div>
      <div className="block">
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
      </div>
      <div className="block">
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
          iconColor={
            isAlignActive(editor, 'center') ? color.white : color.light
          }
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
      </div>
      <div className="block">
        <SquareIconButton
          tip="Insert Table"
          onMouseDown={(event) => {
            event?.preventDefault();
            TablesEditor.insertTable(editor);
          }}
          unFocusable
          iconColor={color.silver_gray}
          Icon={TableIcon}
        />
        <SquareIconButton
          tip="Insert Image"
          iconColor={color.silver_gray}
          onPress={() => {
            modal(
              ({ close }) => (
                <ImageGallery
                  onSelect={async (image) => {
                    const img = await createImage(image);
                    const width = 250;
                    const height = Math.floor((250 * img.height) / img.width);
                    ImageEditor.insertImage(editor, image, { width, height });

                    close();
                  }}
                />
              ),
              { ...DEFAULT_MODAL, width: '90%', height: '90%' },
            ).open();
          }}
          unFocusable
          Icon={AddImage}
        />
      </div>
      <div className="end-block">
        <TextButton
          text="Auto"
          Icon={TagIcon}
          afterBgColor={color.silver_gray}
          onPress={() => {
            modal(
              ({ close }) => (
                <InsertAttributesModal
                  close={close}
                  elements={DEFAULT_AUTO_REF}
                  onChange={(value) => {
                    AttributeEditor.insertAttribute(editor, value);
                  }}
                />
              ),
              DEFAULT_MODAL,
              'Insert Attributes',
            ).open();
          }}
        />
      </div>
    </div>
  );
}
