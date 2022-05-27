import useRouteMatch from '@libs/hooks/useRouteMatch';
import { CSSProperties, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './style/index.scss';
export type Route = { route: string; exact?: true };
interface SmartLinkProps {
  match?: string | Route | (string | Route)[];
  className?: string | ((props: { isMatch: boolean }) => string);
  children?: ReactNode | ((props: { isMatch: boolean }) => ReactNode);
  to: string | Route;
  caseSensitive?: boolean;
  end?: boolean;
  style?: CSSProperties | ((props: { isMatch: boolean }) => CSSProperties);
}
export default function SmartLink({
  match,
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
  const matches = [
    to,
    ...(match
      ? typeof match == 'string' || (match as Route)?.route
        ? [match as string | Route]
        : (match as (string | Route)[])
      : []),
  ];
  const checkMatches = () => {
    return (
      (matches as (string | Route)[]).find((route: string | Route) =>
        typeof route == 'string'
          ? isFirstDescendent(route as string)
          : route.exact
          ? isOnlyDescendent(route.route as string)
          : isFirstDescendent(route.route as string),
      ) != undefined
    );
  };
  return (
    <Link
      to={typeof to == 'string' ? to : (to as Route).route}
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
