import React from 'react';
import './index.scss';
import { css, CSSInterpolation } from '@emotion/css';
type Svg =
  | React.ForwardRefRenderFunction<
      SVGSVGElement,
      React.SVGAttributes<SVGSVGElement>
    >
  | any;
interface LinkyIcon {
  Src: string | Svg;
  link?: string;
  alt: string;
  width?: string;
  cssMod?: CSSInterpolation;
  viewBox?: string;
  stroke?: string;
  svgClassName?: string;
}

function LinkyIcon({
  Src,
  link = '',
  alt,
  width = '3.5vh',
  cssMod,
  viewBox,
  stroke,
  svgClassName,
}: LinkyIcon) {
  console.log(Src);
  return (
    <div className="LinkyIcon">
      {(Src.prototype && (
        <Src
          className={`${css({
            width: '100%',
            height: '100%',
          })} ${svgClassName}`}
          viewBox={viewBox}
          stroke={stroke}
        ></Src>
      )) || (
        <img
          className={css(cssMod ? cssMod : { width: width })}
          src={Src}
          alt={alt}
        />
      )}
    </div>
  );
}

export default LinkyIcon;
