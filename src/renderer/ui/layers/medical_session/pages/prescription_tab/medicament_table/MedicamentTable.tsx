import { useState, useMemo } from 'react';
import Arrow from 'toSvg/arrow.svg?icon';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import './style/index.scss';

type Data = {
  name: string;
  qts: number;
  dose?: number;
  duration: string;
  comment: string;
  id: number;
};
interface MedicamentTableProps {
  editable?: true;
  dataList?: Data[];
}
const table = createTable().setRowType<Data>();
export default function MedicamentTable({
  dataList = [
    {
      name: 'aymen',
      qts: 15,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 1,
    },
    {
      name: 'aymen',
      qts: 10,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 2,
    },
    {
      name: 'aymen',
      qts: 5,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 3,
    },
    {
      name: 'aymen',
      qts: 5,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 3,
    },
    {
      name: 'aymen',
      qts: 5,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 3,
    },
    {
      name: 'aymen',
      qts: 5,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 3,
    },
    {
      name: 'aymen',
      qts: 5,
      dose: 3,
      duration: '5 days',
      comment: 'dont die',
      id: 3,
    },
  ],
  editable,
}: MedicamentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(
    () =>
      [
        table.createDataColumn('name', {
          header: 'Name',
          footer: (props) => props.column.id,
        }),
        table.createDataColumn('qts', {
          header: 'Qts',
          footer: (props) => props.column.id,
        }),

        table.createDataColumn('dose', {
          header: 'Dose',
          cell: ({ getValue }) => (getValue() ?? '*') + '/day',
        }),
        table.createDataColumn('duration', {
          header: 'Duration',
          footer: (props) => props.column.id,
        }),

        table.createDataColumn('comment', {
          header: 'Comment',
          footer: (props) => props.column.id,
        }),

        !!editable &&
          table.createDataColumn('id', {
            header: '',
            id: 'skip',
            size: 1,
            cell: ({ getValue }) => (
              <div css={{ float: 'right' }}>
                <DarkLightCornerButton
                  title="Edit"
                  isActive={true}
                  onPress={() => {
                    //todo:Open editDrugModal(getValue())
                  }}
                />
              </div>
            ),
          }),
      ].filter(Boolean) as any,
    [editable],
  );
  const [data, setData] = useState<Data[]>(dataList);
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
    <div className="medicament-table">
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
