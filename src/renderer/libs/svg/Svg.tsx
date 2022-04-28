import * as React from 'react';
interface SvgProps {
  children: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
export default function Svg({ children }: SvgProps) {
  const Src = children;
  return <Src />;
}
