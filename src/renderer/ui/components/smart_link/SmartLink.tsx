import useRouteMatch from '@libs/hooks/useRouteMatch';
import { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './style/index.scss';
type Route = { route: string; exact?: true };
interface SmartLinkProps {
  match?: string | Route | (string | Route)[];
  className?: (props: { isMatch: boolean }) => string;
  children?: (props: { isMatch: boolean }) => ReactNode;
  to: string | Route;
}
export default function SmartLink({
  match,
  className,
  children,
  to,
}: SmartLinkProps) {
  const { isDescendent, isOnlyDescendent } = useRouteMatch();
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
          ? isDescendent(route as string)
          : route.exact
          ? isOnlyDescendent(route.route as string)
          : isDescendent(route.route as string),
      ) != undefined
    );
  };
  return (
    <Link
      to={typeof to == 'string' ? to : (to as Route).route}
      className={className?.({ isMatch: checkMatches() })}
    >
      {children?.({ isMatch: checkMatches() })}
    </Link>
  );
}
