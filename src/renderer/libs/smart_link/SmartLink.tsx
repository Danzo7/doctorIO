import TextButton from '@components/buttons/text_button';
import useRouteMatch from '@libs/hooks/useRouteMatch';
import { ComponentProps, CSSProperties, ReactNode, useCallback } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';
export type RouteExact = { route: string; exact: true };
export type ToWithInclude = {
  to: string | RouteExact;
  include: string | RouteExact | (string | RouteExact)[];
};
export type ToRoute = string | RouteExact | ToWithInclude;
interface SmartLinkProps {
  className?: string | ((props: { isMatch: boolean }) => string);
  children?: ReactNode | ((props: { isMatch: boolean }) => ReactNode);
  to: ToRoute;
  caseSensitive?: boolean;
  end?: boolean;
  keepLevel?: boolean;
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
  const isMatch = checkMatches();
  return (
    <Link
      onClick={(e) => {
        if (isMatch) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      to={
        typeof to == 'string'
          ? to
          : (to as RouteExact)?.route ?? (to as ToWithInclude).to
      }
      className={
        typeof className == 'function'
          ? (className as (props: { isMatch: boolean }) => string)({
              isMatch: isMatch,
            })
          : (className as string)
      }
      style={
        typeof style == 'function'
          ? (style as (props: { isMatch: boolean }) => CSSProperties)({
              isMatch: isMatch,
            })
          : (style as CSSProperties)
      }
      {...others}
    >
      {typeof children == 'function'
        ? children({ isMatch: isMatch })
        : children}
    </Link>
  );
}
export function NavButton({
  className,
  children,
  to,
  caseSensitive = true,
  keepLevel,
  buttonProps,
}: SmartLinkProps & {
  buttonProps: (props: {
    isMatch: boolean;
  }) => Omit<ComponentProps<typeof TextButton>, 'onPress'>;
}) {
  const navigate = useNavigate();
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
          ? isFirstDescendent(route as string, keepLevel)
          : route.exact
          ? isOnlyDescendent(route.route as string)
          : isFirstDescendent(route.route as string, keepLevel),
      ) != undefined
    );
  }, [isFirstDescendent, isOnlyDescendent, keepLevel, to]);
  const isMatch = checkMatches();
  return (
    <TextButton
      onPress={() => {
        if (!isMatch)
          navigate(
            typeof to == 'string'
              ? to
              : (to as RouteExact)?.route ?? (to as ToWithInclude).to,
          );
      }}
      className={
        typeof className == 'function'
          ? (className as (props: { isMatch: boolean }) => string)({
              isMatch: isMatch,
            })
          : (className as string)
      }
      {...buttonProps({ isMatch: isMatch })}
    >
      {typeof children == 'function'
        ? children({ isMatch: isMatch })
        : children}
    </TextButton>
  );
}
