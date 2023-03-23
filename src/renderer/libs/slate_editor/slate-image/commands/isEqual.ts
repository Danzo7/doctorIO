import { ImageElement } from '../types';

export const isEqual = (node: ImageElement, element: ImageElement) => {
  return node.url == element.url;
};
