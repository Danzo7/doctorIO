import back from 'toSvg/x_mark.svg?icon';

import { ReactNode } from 'react';
import './style/index.scss';
import SquareIconButton from '@components/buttons/square_icon_button';
import { css } from '@emotion/react';
import { createPopper } from '@popperjs/core';

import { OverlayOptions, PopperTargetType } from './types';
import { modal, tooltip } from './stores';

type OverlayItemProps = OverlayOptions & {
  children?: ReactNode;
};

export function OverlayItem({
  children,
  isDimmed = false,
  clickThrough = false,
  backdropColor,
  width,
  height,
  closeBtn,
  popperTarget,
  closeOnClickOutside,
  closeOnBlur,
  autoFocus = true,
  position,
  transition = 'zoom',
  onClose,
  defaultCloseFallback = true,
  style,
  closeMethod,
  clickable = true,
  closable = true,
  type = 'modal',
}: OverlayItemProps) {
  const closeOverlay = () => {
    onClose?.();
    if (!closable) return;
    if (closeMethod) closeMethod();
    else if (defaultCloseFallback)
      if (type == 'tooltip') tooltip.close();
      else modal.close();
  };
  return (
    <>
      {backdropColor !== false && (
        <div
          className="backdrop"
          css={css({
            backgroundColor: isDimmed
              ? backdropColor ?? '#000000d9'
              : undefined,
            pointerEvents: clickThrough ? 'none' : 'all',
          })}
          onClick={
            closable && closeOnClickOutside
              ? (e) => {
                  closeOverlay();
                  e.stopPropagation();
                }
              : undefined
          }
        ></div>
      )}
      <div
        className="layer"
        css={{
          ...style,
          width: width,
          height: height,
          position: position && 'absolute',
          top: position?.top,
          bottom: position?.bottom,
          left: position?.left,
          right: position?.right,
          animation:
            transition != 'none'
              ? `${transition} .1s forwards ease-out`
              : undefined,
          pointerEvents: clickable ? 'all' : 'none',
        }}
        {...(autoFocus ? { tabIndex: -1 } : {})}
        onBlur={
          closable && closeOnBlur
            ? (event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  closeOverlay();
                }
              }
            : undefined
        }
        ref={(e) => {
          e?.focus();
          if (e != null) {
            if (popperTarget)
              createPopper(
                (popperTarget as PopperTargetType).target ?? popperTarget,
                e,
                {
                  modifiers: [
                    {
                      name: 'preventOverflow',
                      options: {
                        padding: 30,
                        altAxis: true,
                      },
                    },
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 5],
                      },
                    },
                    {
                      name: 'flip',
                      options: {
                        altBoundary: true,
                        fallbackPlacements: ['bottom'],
                      },
                    },
                  ],
                  ...((popperTarget as PopperTargetType).options ?? {
                    placement: 'auto-end',
                  }),
                },
              );
          }
        }}
      >
        {closable && closeBtn && (
          <div
            className={`close-btn ${
              typeof closeBtn == 'string' ? closeBtn : closeBtn.placement
            }`}
          >
            {typeof closeBtn == 'string' ? (
              <SquareIconButton
                onPress={() => closeOverlay()}
                Icon={back}
                tip="Close"
              />
            ) : (
              closeBtn.placement
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
