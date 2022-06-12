import './style/index.scss';
import colors from '@colors';
import useLongPress from '@libs/hooks/useLongPress';
import {
  FunctionComponent,
  ReactNode,
  SVGProps,
  useState,
  MouseEvent,
} from 'react';
type IconProps = {
  svg: FunctionComponent<SVGProps<SVGSVGElement>> | ReactNode;
  iconColor?: string;
  iconAfterColor?: string;
  iconType?: 'stroke' | 'fill';
};
export type PressHandler = (e?: MouseEvent<HTMLButtonElement>) => void;
export type IconType =
  | FunctionComponent<SVGProps<SVGSVGElement>>
  | IconProps
  | ReactNode;
interface TextButtonProps {
  text?: string;
  Icon?: IconType;
  children?: React.ReactNode;
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  afterBgColor?: string;
  activeBgColor?: string;
  activeBorderColor?: string;
  afterBorderColor?: string;
  afterFontColor?: string;
  radius?: number | string;
  padding?: string | number;
  onPress?: PressHandler;
  onHold?: () => void;
  width?: number | string;
  height?: number | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  alignment?:
    | 'center'
    | 'baseline'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start';
  itemsDirection?: 'row' | 'row-reverse';
  alignSelf?:
    | 'center'
    | 'baseline'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start'
    | 'stretch';
  blank?: true;
}
function TextButton({
  text,
  Icon,
  fontColor,
  fontSize = 14,
  fontWeight = 600,
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  borderWidth = 1,
  radius = 7,
  afterBgColor,
  afterBorderColor,
  afterFontColor,
  width,
  height,
  children,
  padding,
  onPress,
  activeBgColor = colors.light,
  type,
  activeBorderColor,
  disabled = false,
  alignment,
  alignSelf,
  itemsDirection,
  onHold,
  blank,
}: TextButtonProps) {
  const [isHold, setHold] = useState(false); //if onHold==undefined will never be triggered
  const [startHold, cancelHold] = useLongPress({
    onEndHold: onHold
      ? () => {
          onHold();
          setHold(true);
        }
      : undefined,
    ms: 1000,

    onStartHold: () => {},
    onCancel: () => {
      onPress?.();
    },
  });
  const IconChild = () => {
    let Node: FunctionComponent | ReactNode;
    Node =
      (Icon as IconProps)?.svg != undefined
        ? (Icon as IconProps).svg
        : (Node = Icon as FunctionComponent | ReactNode);

    if ((Node as FunctionComponent)?.prototype != undefined) {
      Node = Node as FunctionComponent<SVGProps<SVGSVGElement>>;
      return <Node />;
    }
    return Node as ReactNode;
  };

  return (
    <button
      type={type}
      className={`text-button${isHold ? ' hold' : ''}`}
      css={{
        backgroundColor: !disabled ? backgroundColor : colors.silver_gray,
        border: `${borderColor} ${borderWidth}px solid`,
        justifyContent: alignment,
        flexDirection: itemsDirection,
        alignSelf: alignSelf,
        borderRadius: radius,
        padding: padding,
        width: width,
        height: height,
        cursor: disabled ? 'no-drop' : undefined,
        '>svg>path': {
          stroke:
            (Icon as IconProps)?.iconType === 'stroke'
              ? !disabled
                ? (Icon as IconProps)?.iconColor
                : colors.text_gray
              : undefined,
          fill:
            (Icon as IconProps)?.iconType === 'fill'
              ? !disabled
                ? (Icon as IconProps)?.iconColor
                : colors.text_gray
              : undefined,
        },
        '&:active': {
          boxShadow:
            !disabled && activeBgColor
              ? `inset 1000px 1000px 1px ${activeBgColor}`
              : undefined,

          border:
            !disabled && activeBorderColor
              ? `${activeBorderColor} 1px solid`
              : undefined,
        },
        '&:hover': {
          backgroundColor: !disabled ? afterBgColor : undefined,
          border:
            !disabled && afterBorderColor
              ? `${afterBorderColor} 1px solid`
              : undefined,
          '>svg>path': {
            stroke:
              (Icon as IconProps)?.iconType === 'stroke'
                ? !disabled
                  ? (Icon as IconProps)?.iconAfterColor
                  : colors.text_gray
                : undefined,
            fill:
              (Icon as IconProps)?.iconType === 'fill'
                ? !disabled
                  ? (Icon as IconProps)?.iconAfterColor
                  : colors.text_gray
                : undefined,
          },
          '> span': {
            color: !disabled && afterFontColor ? afterFontColor : undefined,
          },
        },
      }}
      onClick={
        onHold == undefined
          ? (e) => {
              if (!blank) {
                e.preventDefault();
                e.stopPropagation();
              }
              onPress?.(e);
            }
          : undefined
      }
      onMouseDown={
        onHold != undefined
          ? (e) => {
              if (!blank) {
                e.preventDefault();
                e.stopPropagation();
              }
              startHold?.();
            }
          : undefined
      }
      onMouseUp={
        onHold != undefined
          ? (e) => {
              if (!blank) {
                e.preventDefault();
                e.stopPropagation();
              }
              cancelHold?.();
            }
          : undefined
      }
      onAnimationEnd={
        onHold != undefined
          ? () => {
              setHold(false);
            }
          : undefined
      }
      disabled={disabled}
    >
      <>
        {children}
        {IconChild()}
      </>
      {text && (
        <span
          className={'text'}
          css={{
            color: !disabled ? fontColor : colors.text_gray,
            fontSize: fontSize,
            fontWeight: fontWeight,
          }}
        >
          {text}
        </span>
      )}
    </button>
  );
}

export default TextButton;
