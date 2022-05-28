import useRouteMatch from '@libs/hooks/useRouteMatch';
import { CSSProperties, ReactNode, useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
export type RouteExact = { route: string; exact: true };
export type ToWithInclude = {
  to: string | RouteExact;
  include: string | RouteExact | (string | RouteExact)[];
};
export type ToRoute = string | RouteExact | ToWithInclude;
interface SmartLinkProps {
  className?: string | ((props: { isMatch: boolean }) => string);
  children?: ReactNode | ((props: { isMatch: boolean }) => ReactNode);
  to: string | RouteExact | ToWithInclude;
  caseSensitive?: boolean;
  end?: boolean;
  style?: CSSProperties | ((props: { isMatch: boolean }) => CSSProperties);
}
export default function SmartLink({
  className,
  style,
  children,
  to,
  caseSensitive = true,
  ...others
}: SmartLinkProps &
  Omit<LinkProps, 'className' | 'style' | 'children' | 'to'> &
  React.RefAttributes<HTMLAnchorElement>) {
  const { isFirstDescendent, isOnlyDescendent } = useRouteMatch({
    caseSensitive: caseSensitive,
  });

  const checkMatches = useCallback(() => {
    const matches = [
      ...(typeof to == 'string' || (to as RouteExact)?.route != undefined
        ? [to as string | RouteExact]
        : [
            (to as ToWithInclude).to,
            ...(typeof (to as ToWithInclude).include == 'string' ||
            ((to as ToWithInclude).include as RouteExact)?.route != undefined
              ? [(to as ToWithInclude).include as string | RouteExact]
              : ((to as ToWithInclude).include as (string | RouteExact)[])),
          ]),
    ];
    return (
      (matches as (string | RouteExact)[]).find((route: string | RouteExact) =>
        typeof route == 'string'
          ? isFirstDescendent(route as string)
          : route.exact
          ? isOnlyDescendent(route.route as string)
          : isFirstDescendent(route.route as string),
      ) != undefined
    );
  }, [isFirstDescendent, isOnlyDescendent, to]);
  return (
    <Link
      to={
        typeof to == 'string'
          ? to
          : (to as RouteExact)?.route ?? (to as ToWithInclude).to
      }
      className={
        typeof className == 'function'
          ? (className as (props: { isMatch: boolean }) => string)?.({
              isMatch: checkMatches(),
            })
          : (className as string)
      }
      style={
        typeof style == 'function'
          ? (style as (props: { isMatch: boolean }) => CSSProperties)?.({
              isMatch: checkMatches(),
            })
          : (style as CSSProperties)
      }
      {...others}
    >
      {typeof children == 'function'
        ? children?.({ isMatch: checkMatches() })
        : children}
    </Link>
  );
}
