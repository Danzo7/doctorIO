import { ImageElement } from '../types';

export const isImageElement = (node: any): node is ImageElement => {
  return (node as ImageElement).type === 'image';
};
