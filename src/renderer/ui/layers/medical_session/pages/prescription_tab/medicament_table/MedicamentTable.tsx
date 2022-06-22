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
import AddDrugModal from '@containers/modals/add_drug_modal';
import { useOverlay } from '@libs/overlay/useOverlay';

type Data = {
  drugName: string;
  qts: number;
  dose?: number;
  duration: number;
  comment: string;
  id: number;
};
interface MedicamentTableProps {
  editable?: true;
  dataList?: Data[];
}
const table = createTable().setRowType<Data>();
export default function MedicamentTable({
  editable,
  dataList = [],
}: MedicamentTableProps) {
  const { open } = useOverlay();
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(
    () =>
      [
        table.createDataColumn('drugName', {
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
          cell: ({ getValue }) =>
            (getValue() ?? '*') + `${getValue() > 1 ? ' days' : ' day'}`,
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
            cell: ({ getValue, row }) => (
              <div css={{ float: 'right' }}>
                <DarkLightCornerButton
                  title="Edit"
                  isActive={true}
                  onPress={() => {
                    open(
                      <AddDrugModal
                        defaultValues={{
                          drugName: row.getValue('drugName'),
                          qts: row.getValue('qts'),
                          dose: row.getValue('dose'),
                          duration: row.getValue('duration'),
                          comment: row.getValue('comment'),
                        }}
                        onSubmitPress={(formData) => {
                          console.log(formData); //TODO : implement Edit data function
                        }}
                      />,
                      {
                        closeOnClickOutside: true,
                        isDimmed: true,
                        clickThrough: false,
                        position: { top: '30%' },
                        width: '30%',
                        closeBtn: 'inner',
                      },
                    );
                  }}
                />
              </div>
            ),
          }),
      ].filter(Boolean) as any,
    [editable],
  );

  const instance = useTableInstance(table, {
    data: dataList,
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
