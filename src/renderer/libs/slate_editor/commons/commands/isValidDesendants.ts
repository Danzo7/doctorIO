import { Descendant, Element } from 'slate';
import { traverseElements } from '../core';

export const isValidDesendants = (desendants: Descendant[]) => {
  if (desendants.length === 0) {
    return false;
  }
  for (const el of traverseElements(desendants as Element[])) {
    if (!('text' in el || 'type' in el)) {
      return false;
    }
  }
  return true;
};
