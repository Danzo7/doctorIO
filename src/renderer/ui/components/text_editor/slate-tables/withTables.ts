import type { Editor } from 'slate';

import { withNormalization } from './withNormalization';
import { TableCellElement, TableElement, TableRowElement } from './types';
import { withTablesDeleteBehavior, withTablesCopyPasteBehavior } from './core';

export function withTables<T extends Editor>(editor: T) {
  const tablesEditor = Object.assign(editor, {
    createContentNode: () => ({
      type: 'p',
      children: [{ text: '' }],
    }),
    createTableCellNode: () => ({
      type: 'td',
      children: [
        {
          type: 'p',
          children: [{ text: '' }],
        },
      ],
    }),
    createTableRowNode: () => ({
      type: 'tr',
      children: [
        {
          type: 'td',
          children: [
            {
              type: 'p',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
      ],
    }),
    createTableNode: () => ({
      type: 'table',
      children: [
        {
          type: 'tr',
          children: [
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              type: 'td',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    isTableCellNode(node: any) {
      return (node as TableCellElement).type === 'td';
    },
    isTableRowNode(node: any) {
      return (node as TableRowElement).type === 'tr';
    },
    isTableNode(node: any) {
      return (node as TableElement).type === 'table';
    },
  }) as T;

  return withTablesDeleteBehavior(
    withTablesCopyPasteBehavior(withNormalization(tablesEditor)),
  );
}
