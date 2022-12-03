import { useState } from 'react';
import { useChannel } from 'stores';
import { useForm } from '@mantine/form';

import { showNotification } from '@mantine/notifications';
import { Stack, TextInput, NumberInput, Button } from '@mantine/core';

type Props = {
  id: string;
  isEdit?: boolean;
  onSubmitted?: (chan: Channel) => void;
  defaultValue?: Channel;
};

export default function CreateChannel({ id, isEdit, defaultValue, onSubmitted }: Props) {
  const [loading, setLoading] = useState(false);

  const [create, update] = useChannel((state) => [state.add, state.update]);

  const { onSubmit, getInputProps } = useForm({
    initialValues: defaultValue || {
      qos: 0,
      topic: '',
    },
    validate: {
      topic: (value) => !value && 'Name is required',
    },
  });

  const handleSubmit = async (data: Channel) => {
    try {
      setLoading(true);
      if (isEdit) update(id, defaultValue!.topic, data);
      else create(id, data);
      onSubmitted?.(data);
      showNotification({
        color: 'green',
        title: 'Success',
        message: 'Successfully created/updated channel',
      });
    } catch (err: any) {
      console.error(err);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Unknown error when creating/updating channel',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack spacing={12}>
        <TextInput withAsterisk label="Topic" {...getInputProps('topic')} />
        <NumberInput label="Qos" {...getInputProps('qos')} />
        <div />
        <Button loading={loading} type="submit">
          Submit Data
        </Button>
      </Stack>
    </form>
  );
}
