import { useLocation, useParams } from 'react-router-dom';

export default function useRouteMatch() {
  const tree = decodeURI(useLocation().pathname).split('/');
  const lastRoute = tree[tree.length - 1];
  const childRoute = Object.values(useParams())[0] || '';
  const parentRoute =
    childRoute == undefined || childRoute?.length == 0
      ? lastRoute
      : tree[tree.indexOf(childRoute.split('/')[0]) - 1];
  const isDescendent = (route: string) =>
    (route.length == 0 && parentRoute == lastRoute) ||
    tree.indexOf(route) == tree.indexOf(parentRoute) + 1;

  const isOnlyDescendent = (route: string): boolean =>
    (route.length == 0 && parentRoute == lastRoute) || route == childRoute;

  return { isOnlyDescendent, isDescendent, lastRoute, parentRoute, childRoute };
}
