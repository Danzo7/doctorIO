import { useState } from 'react';
import Arrow from 'toSvg/arrow.svg?icon';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import './style/index.scss';
import AddDrugModal from '@containers/modals/add_drug_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { Drug } from '@models/instance.model';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import { modal } from '@stores/overlayStore';

interface MedicamentTableProps {
  editable?: true;
  drugList: Drug[];
}

const table = createColumnHelper<Drug>();
export default function MedicamentTable({
  editable,
  drugList,
}: MedicamentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = [
    table.accessor('name', {
      header: 'Name',
      footer: (props) => props.column.id,
    }),
    table.accessor('qts', {
      header: 'Qts',
      footer: (props) => props.column.id,
    }),

    table.accessor('dosage', {
      header: 'Dose',
      cell: ({ getValue }) => getValue() + '/day',
    }),
    table.accessor('duration', {
      header: 'Duration',
      cell: ({ getValue }) =>
        (getValue() ?? '*') + `${getValue() > 1 ? ' days' : ' day'}`,
    }),

    table.accessor('description', {
      header: 'description',
      footer: (props) => props.column.id,
    }),

    !!editable &&
      table.accessor('id', {
        header: '',
        id: 'skip',
        size: 1,
        cell: ({ row, getValue }) => (
          <div css={{ float: 'right' }}>
            <DarkLightCornerButton
              text="Edit"
              isActive={true}
              onPress={() => {
                modal(
                  ({ close }) => (
                    <AddDrugModal
                      defaultValues={{
                        name: row.getValue('name'),
                        qts: row.getValue('qts'),
                        dosage: row.getValue('dosage'),
                        duration: row.getValue('duration'),
                        description: row.getValue('description'),
                        id: getValue(),
                      }}
                      onSubmit={(data) => {
                        useMedicalSessionStore
                          .getState()
                          .updateDrug(getValue(), data);
                        close();
                      }}
                    />
                  ),
                  DEFAULT_MODAL,
                ).open();
              }}
            />
          </div>
        ),
      }),
  ].filter(Boolean) as any;

  const instance = useReactTable({
    data: drugList,
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
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
