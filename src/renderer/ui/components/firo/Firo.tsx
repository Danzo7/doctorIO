/* eslint-disable react/jsx-key */
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { Column, useTable } from 'react-table';
import Input from '@components/inputs/input';
import Datepicker from '@components/inputs/datepicker';

type Inputs = {
  password: string;
  moms: string;
};

export default function Firo() {
  const {
    register,
    handleSubmit,
    //  watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  interface Data {
    col1: string;
    col2: string;
  }
  const data: Data[] = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    [],
  );

  const columns: Column<Data>[] = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    [],
  );
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // console.log(watch('example')); // watch input value by passing the name of it
  return (
    <>
      <table
        {...getTableProps()}
        className="border-collapse table-auto w-full text-sm"
      >
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps()}
                      className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()} className="bg-white dark:bg-slate-800">
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                        >
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          css={{
            backgroundColor: 'hotpink',
            '&:hover': {
              color: 'lightgreen',
            },
          }}
        >
          This has a hotpink background.
        </div>
        <Input
          placeholder="write something long"
          type={'password'}
          label="password"
          errorMsg={errors.password?.message}
          register={register('password', { required: 'this is required' })}
        />
        <Input
          hint="write your mom's name"
          label="mom's name"
          type={'email'}
          errorMsg={errors.moms?.message}
          register={register('moms', {
            required: 'this is required too',
            minLength: { message: 'are you stupid or what! ', value: 5 },
          })}
        />
        <Datepicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
        <DarkLightCornerButton type="submit" title="submit" />
      </form>
    </>
  );
}
