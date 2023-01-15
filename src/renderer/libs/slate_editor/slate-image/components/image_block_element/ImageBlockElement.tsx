import { Editor, Transforms } from 'slate';
import { ImageElement } from '../../types';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import DraggableButton from '@components/buttons/draggable_button';
import { ImageEditor } from '../../ImageEditor';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import ControlTooltip from '@libs/slate_editor/components/control_tooltip';
import trashCan from 'toSvg/trash_can.svg?icon';

interface ImageBlockElementProps {
  editor: Editor;
  element: ImageElement;
  show: boolean;
}
export default function ImageBlockElement({
  editor,
  element,
  show,
}: ImageBlockElementProps) {
  return (
    <span
      css={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <img
        width={element.mWidth}
        height={element.mHeight}
        src={element.url}
        css={{ filter: show ? 'brightness(0.5)' : 'none' }}
      ></img>
      {show && (
        <span
          css={{
            display: 'inline-block',
            zIndex: 10,
          }}
        >
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', top: -5, left: -5 }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                height: element.mHeight - client.y,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', bottom: 0, left: -5 }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                height: element.mHeight + client.y,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', top: -5, right: -5 }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                width: element.mWidth + client.x,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', bottom: '50%', right: -5 }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                width: element.mWidth + client.x,
                height: element.mHeight,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', bottom: 0, right: '50%' }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                width: element.mWidth,
                height: element.mHeight + client.y,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', top: -5, right: '50%' }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                width: element.mWidth,
                height: element.mHeight - client.y,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', bottom: '50%', left: -5 }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                width: element.mWidth - client.x,
                height: element.mHeight,
              });
            }}
          />
          <DraggableButton
            backgroundColor={color.hot_red}
            padding={5}
            css={{ position: 'absolute', bottom: 0, right: -5 }}
            onDrag={(client) => {
              ImageEditor.setImageSize(editor, element, {
                width: element.mWidth + client.y,
              });
            }}
          />
        </span>
      )}
      {show && (
        <ControlTooltip>
          <SquareIconButton
            borderColor={color.cold_red}
            iconColor={color.cold_red}
            afterBgColor={color.cold_red}
            Icon={trashCan}
            iconAfterColor={color.white}
            unFocusable
            onPress={() => {
              Transforms.removeNodes(editor, {
                at: [],
                match: (n) => n === element,
              });
            }}
          />
          {/* TODO:Change with icons */}
          <TextButton
            text="x.5"
            borderColor={color.cold_blue}
            afterBgColor={color.cold_blue}
            padding={5}
            onPress={() => {
              ImageEditor.setImageSizeByRatio(editor, element, 0.5);
            }}
          />
          <TextButton
            text="x.75"
            borderColor={color.cold_blue}
            afterBgColor={color.cold_blue}
            padding={5}
            onPress={() => {
              ImageEditor.setImageSizeByRatio(editor, element, 0.75);
            }}
          />
          <TextButton
            text="x1.5"
            borderColor={color.cold_blue}
            afterBgColor={color.cold_blue}
            padding={5}
            onPress={() => {
              ImageEditor.setImageSizeByRatio(editor, element, 1.5);
            }}
          />
          <TextButton
            text="Origin"
            borderColor={color.cold_blue}
            afterBgColor={color.cold_blue}
            padding={5}
            onPress={() => {
              ImageEditor.resetOriginalSize(editor, element);
            }}
          />
        </ControlTooltip>
      )}
    </span>
  );
}
