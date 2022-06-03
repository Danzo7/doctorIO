import { useState, useMemo, ReactNode } from 'react';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import './style/index.scss';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Arrow from 'toSvg/arrow.svg?icon';
import Minus from 'toSvg/minus.svg?icon';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';

interface TableDemoProps {}
type Data = {
  firstName: string;
  lastName: string;
  age: number;
  id: string;
};
const table = createTable().setRowType<Data>();

export default function TableDemo({}: TableDemoProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      table.createDataColumn('firstName', {
        footer: (props) => props.column.id,
      }),
      table.createDataColumn((row) => row.lastName, {
        id: 'lastName',
        header: () => 'Last name',
        footer: (props) => props.column.id,
      }),

      table.createDataColumn('age', {
        header: () => 'Age',
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('id', {
        footer: (props) => props.column.id,
      }),
      table.createDataColumn('id', {
        header: '',
        id: 'skip',
        cell: ({ getValue }) => (
          <div css={{ float: 'right' }}>
            <DarkLightCornerButton title={getValue()} isActive={true} />
          </div>
        ),
      }),
    ],
    [],
  );
  const [data, setData] = useState<Data[]>([
    { firstName: 'aymen', lastName: 'brahim', age: 118, id: '12421' },
    { firstName: 'cq', lastName: 'brahim', age: 18, id: '12124' },
    { firstName: 'bx', lastName: 'brahim', age: 1823, id: '1214' },
    { firstName: 'dad', lastName: 'brahim', age: 180, id: '2124' },
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
                        <span>{header.renderHeader()}</span>
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
                  return <td key={cell.id}>{cell.renderCell()}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
