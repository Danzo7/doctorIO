import commands from './commands';
import { ImageElement } from './types';
export const ImageEditor = {
  isImageElement(node: any): node is ImageElement {
    return (node as ImageElement).type === 'image';
  },
  isEqual(node: ImageElement, element: ImageElement) {
    return node.url == element.url;
  },
  ...commands,
};
