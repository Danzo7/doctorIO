import { Element } from 'slate';

export const initElement = (): Element[] => {
  return [
    {
      type: 'p',
      children: [{ text: '' }],
    },
  ];
};
