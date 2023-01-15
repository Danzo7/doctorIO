import type { BaseElement } from 'slate';

export interface ElementNode extends BaseElement {
  type: string;
}
function isElementType(
  elementType: string,
  checkType: string | string[],
): boolean {
  return (
    (typeof checkType === 'string' && elementType === checkType) ||
    (Array.isArray(checkType) && checkType.includes(elementType))
  );
}

/**
 * Check if the value is having an `ElementNode` shape: `{ children: array, type: string }`.
 */
export function isElementNode(value: unknown): value is ElementNode;

/**
 * Check if the value is an `ElementNode` of the given type.
 */
export function isElementNode<T extends ElementNode>(
  value: unknown,
  type: T['type'],
): value is T;

/**
 * Check if the value is an `ElementNode` of one of the given types.
 */
export function isElementNode<T extends ElementNode>(
  value: unknown,
  type: T['type'][],
): value is T;

export function isElementNode(value: any, type?: string | string[]): boolean {
  return (
    Array.isArray(value.children) &&
    typeof value.type === 'string' &&
    (type === undefined || isElementType(value.type, type))
  );
}
