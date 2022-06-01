/* eslint-disable react/jsx-key */
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Input from '@components/inputs/input';
import Datepicker from '@components/inputs/datepicker';

type Inputs = {
  password: string;
  moms: string;
  momss: string;
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
          {...register('password', { required: 'this is required' })}
        />
        <Input
          hint="write your mom's name"
          label="mom's name"
          type={'email'}
          errorMsg={errors.moms?.message}
          {...register('moms', {
            required: 'this is required too',
            minLength: { message: 'are you stupid or what! ', value: 5 },
          })}
        />
        <Input
          hint="write your mom's name"
          label="mom's name"
          type={{ type: 'numeric', min: 1, max: 10, step: 1 }}
          errorMsg={errors.momss?.message}
          {...register('momss', {
            required: 'this is required too',
            max: { message: '8! ', value: 8 },
          })}
        />
        <Datepicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
        <DarkLightCornerButton type="submit" title="submit" blank />
      </form>
    </>
  );
}
