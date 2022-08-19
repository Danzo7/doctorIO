import { useState, useMemo, useEffect } from 'react';
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
import { DEFAULT_MODAL } from '@libs/overlay';
import { Drug } from '@models/instance.model';
import { useAppSelector } from '@store';

interface MedicamentTableProps {
  editable?: true;
}

const table = createTable().setRowType<Drug>();
export default function MedicamentTable({ editable }: MedicamentTableProps) {
  const prescription = useAppSelector((state) => state.session.prescription);
  const data = prescription.map((prec, index) => ({ ...prec, id: index }));

  const { open } = useOverlay();
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

        table.createDataColumn('dosage', {
          header: 'Dose',
          cell: ({ getValue }) => getValue() + '/day',
        }),
        table.createDataColumn('duration', {
          header: 'Duration',
          cell: ({ getValue }) =>
            (getValue() ?? '*') + `${getValue() > 1 ? ' days' : ' day'}`,
        }),

        table.createDataColumn('description', {
          header: 'description',
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
                  text="Edit"
                  isActive={true}
                  onPress={() => {
                    open(
                      <AddDrugModal
                        defaultValues={{
                          name: row.getValue('name'),
                          qts: row.getValue('qts'),
                          dosage: row.getValue('dosage'),
                          duration: row.getValue('duration'),
                          description: row.getValue('description'),
                          id: row.getValue('id'),
                        }}
                      />,
                      DEFAULT_MODAL,
                    );
                  }}
                />
              </div>
            ),
          }),
      ].filter(Boolean) as any,
    [editable, open],
  );

  const instance = useTableInstance(table, {
    data: data,
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
