import * as React from 'react';
import './index.scss';
import { css, CSSInterpolation } from '@emotion/css';
type Svg = React.FunctionComponent<React.SVGProps<SVGSVGElement>> | any;
interface LinkyIconProps {
  Src: string | Svg;
  alt?: string;
  width?: string;
  scale?: number;
  cssMod?: CSSInterpolation;
  viewBox?: string;
  stroke?: string;
  svgClassName?: string;
}

function LinkyIcon({
  Src,
  alt,
  width,
  cssMod,
  viewBox,
  stroke,
  scale,
  svgClassName,
}: LinkyIconProps) {
  return (
    <div
      className={`LinkyIcon ${css`
        width: ${width ?? 100 + '%'};
        height: ${width ?? 100 + '%'};
      `}`}
    >
      {(Src.prototype && (
        <Src
          className={`${css({
            width: '100%',
            height: '100%',
            transform: `scale(${scale}%)`,
          })} ${svgClassName ?? ''}`}
          viewBox={viewBox ?? '0 -27 36 90'}
          stroke={stroke}
        ></Src>
      )) || (
        <img
          className={css(
            cssMod ? cssMod : { width: width, transform: `scale(${scale}%)` },
          )}
          src={Src}
          alt={alt}
        />
      )}
    </div>
  );
}

export default LinkyIcon;
