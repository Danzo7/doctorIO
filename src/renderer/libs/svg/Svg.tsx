import React from 'react';
interface SvgProps {
  Src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
export default function Svg({ Src }: SvgProps) {
  return <Src />;
}
