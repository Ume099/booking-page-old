import Select2 from '@/components/React-Hook-Form/Select';
import { KOMOKU_LIST } from '@/lib/invoice';
import { Box } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

type FormData = {
  items: { test: string; test2: string }[];
};

const AAA = (): JSX.Element => {
  const { control, handleSubmit } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index: number) => (
        <Box key={field.id}>
          <Controller
            name={`items.${index}.test`}
            control={control}
            render={({ field }) => <input {...field} />}
          />
          <Controller
            name={`items.${index}.test2`}
            control={control}
            render={({ field }) => <Select2<string> optionList={KOMOKU_LIST} {...field} />}
          />
          <button type="button" onClick={() => remove(index)}>
            削除
          </button>
        </Box>
      ))}
      <button type="button" onClick={() => append({ test: '', test2: '' })}>
        追加
      </button>
      <button type="submit">送信</button>
    </form>
  );
};

export default AAA;
