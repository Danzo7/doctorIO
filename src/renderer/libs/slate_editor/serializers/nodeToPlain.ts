import { Descendant, Node } from 'slate';
import { FormattedText } from '../slate.types';

export const nodeToPlain = (nodes: Descendant[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};
export const painToDescendants = (
  plain: string,
  props?: Omit<Partial<FormattedText>, 'text'>,
) => {
  const lines = plain.split('\n');
  return lines.map((line) => ({
    type: 'p',
    children: [{ text: line, ...props }],
  })) as Descendant[];
};
