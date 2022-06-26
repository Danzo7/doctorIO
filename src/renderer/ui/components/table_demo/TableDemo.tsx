import { useState, useMemo, ReactNode } from 'react';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';

interface TableDemoProps {}
type Data = {
  name: string;
  dose?: number;
  comment: string;
  qts: number;
  id: number;
};
const table = createTable().setRowType<Data>();

export default function TableDemo({}: TableDemoProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      table.createDataColumn('qts', {
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('name', {
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('dose', {
        header: 'Dose',
        cell: ({ getValue }) => (getValue() ?? '*') + '/day',
      }),

      table.createDataColumn('comment', {
        footer: (props) => props.column.id,
      }),

      table.createDataColumn('id', {
        header: '',
        id: 'skip',
        size: 1,
        cell: ({ getValue }) => (
          <div css={{ float: 'right' }}>
            <DarkLightCornerButton
              text={getValue().toString()}
              isActive={true}
            />
          </div>
        ),
      }),
    ],
    [],
  );
  const [data, setData] = useState<Data[]>([
    { name: 'aymen', comment: 'dont die', qts: 2, dose: 3, id: 1 },
    { name: 'panadol 500g', comment: 'after dinner', qts: 2, dose: 3, id: 3 },
    { name: 'panadol 500g', comment: 'after dinner', qts: 2, dose: 3, id: 2 },
    {
      name: 'panadol 500g',
      comment: 'after dinner',
      qts: 2,
      id: 4,
    },
  ]);

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="table-demo">
      <table>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder || header.id == 'skip' ? null : (
                      <div onClick={header.column.getToggleSortingHandler()}>
                        <span className="text-cell">
                          {header.renderHeader()}
                        </span>
                        {header.column.getIsSorted() && (
                          <Arrow
                            css={{
                              transform:
                                header.column.getIsSorted() == 'asc'
                                  ? 'rotate(180deg)'
                                  : undefined,
                              width: 10,
                            }}
                          />
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="text-cell" key={cell.id}>
                      {cell.renderCell()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
