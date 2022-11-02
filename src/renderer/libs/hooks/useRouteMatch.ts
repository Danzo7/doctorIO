import { useCallback, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function useRouteMatch(
  {
    caseSensitive,
  }: {
    caseSensitive: boolean;
  } = { caseSensitive: true },
) {
  const path = useLocation().pathname;

  //params repressent a child of a route
  //when params are undefined it mean we still in the root Routes stack
  const params = Object.values(useParams())[0];

  //tree represent route tree with minimum length==1
  //first index is always an empty string represent the root route reason :"/something".split("/")=>["","something"]
  const tree = useMemo(
    () =>
      path == '/' //this is the root path and in this case it will result ["",""]
        ? [''] //We prevent that by setting it to [""] manually, (empty string for representing the root)
        : decodeURI(caseSensitive ? path : path.toLowerCase())
            .replace(/\/*$/, '')
            .split('/'),
    [caseSensitive, path],
  );

  //if length equal to 1 mean we are in root
  const inRoot = tree.length == 1;
  //second index could be the child in case when params are undefined
  const secondRoute = !inRoot ? tree[1] : undefined;

  //lastRoute is the last Route in the tree
  const lastRoute = tree[tree.length - 1];
  //childRoute is the current route in routeStack
  //childRoute equal to params
  //in case treeLength==2(mean we are in the root routes stack) or params is undefined (usually both are true) then second child is the child
  const childRoute = useMemo(
    () =>
      tree.length == 2 || params == undefined
        ? secondRoute
        : caseSensitive
        ? params
        : params.toLowerCase(),
    [caseSensitive, params, secondRoute, tree.length],
  );

  //parentRoute is the parent of currentRoute(the route before childRoute)
  //in case no child or treeLength=2 parent is an empty string which represent the root route
  const parentRoute = useMemo(
    () =>
      tree.length == 2 || childRoute == undefined
        ? ''
        : childRoute.length == 0
        ? lastRoute
        : tree[tree.indexOf(childRoute.split('/')[0]) - 1],
    [childRoute, lastRoute, tree],
  );

  //isFirstDescendent take a route(string) and return true if that route is the first child of the parent route of the current route stack
  const isFirstDescendent = useCallback(
    (route: string, keepLevel?: boolean) => {
      if (!caseSensitive) route = route.toLowerCase();
      if (route[0] == '/') route = route.substring(1);
      const splittedRoute = route.split('/');
      const sRoute = splittedRoute[0];
      const eRoute =
        splittedRoute.length == 1
          ? undefined
          : splittedRoute[splittedRoute.length - 1];

      return (
        route == parentRoute ||
        (keepLevel && parentRoute == eRoute) ||
        (route.length == 0 && parentRoute == lastRoute) ||
        route == childRoute ||
        route == childRoute?.split('/')[0] ||
        (eRoute &&
          sRoute == childRoute?.split('/')[0] &&
          tree.indexOf(eRoute) == tree.indexOf(sRoute) + 1)
      );
    },
    [caseSensitive, childRoute, lastRoute, parentRoute, tree],
  );

  //isOnlyDescendent take a route(string) and return true if that route is the first child of the parent route of the current route stack and the last route
  //this should be used in a exact match situation
  const isOnlyDescendent = useCallback(
    (route: string): boolean => {
      if (!caseSensitive) route = route.toLowerCase();
      const splittedRoute = route.split('/');
      const sRoute = splittedRoute[0];
      const eRoute =
        splittedRoute.length == 1
          ? undefined
          : splittedRoute[splittedRoute.length - 1];

      return (
        (route.length == 0 && parentRoute == lastRoute) ||
        (eRoute == undefined && route == lastRoute) ||
        (eRoute == lastRoute &&
          sRoute == childRoute?.split('/')[0] &&
          tree.indexOf(eRoute) == tree.indexOf(sRoute) + 1)
      );
    },
    [caseSensitive, childRoute, lastRoute, parentRoute, tree],
  );

  return {
    isOnlyDescendent,
    isFirstDescendent,
  };
}
