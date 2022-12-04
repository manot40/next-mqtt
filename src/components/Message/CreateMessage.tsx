import { useForm } from '@mantine/form';
import { useSession, useChannel } from 'stores';

import { Group, NumberInput, Stack, TextInput, Textarea, Autocomplete, Switch, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

type Props = {
  clientId: string;
};

export default function CreateMessage({ clientId }: Props) {
  const session = useSession((state) => state.data)[clientId]!;
  const channel = useChannel((state) => state.data)[clientId]!;

  const { onSubmit, getInputProps } = useForm<Topic>({
    initialValues: {
      qos: 0,
      topic: '',
      retain: false,
      message: '',
    },
    validate: {
      message: (m) => !m && 'Message content is required',
    },
  });

  const handleSubmit = ({ topic, message, retain, qos }: Topic) => {
    session.publish(topic, message, { retain, qos: qos as any });
    showNotification({
      color: 'green',
      title: 'Success',
      message: 'Successfully published message',
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack spacing={12}>
        <Group noWrap>
          <Autocomplete label="Topic Name" data={channel.map((chan) => chan.topic)} {...getInputProps('topic')} />
          <NumberInput w={80} label="Qos" {...getInputProps('qos')} />
          <Switch
            label="Retain"
            miw="max-content"
            align="content-center"
            {...getInputProps('retain', { type: 'checkbox' })}
          />
        </Group>
        <Textarea label="Message" {...getInputProps('message')} />
        <div />
        <Button type="submit">Publish</Button>
      </Stack>
    </form>
  );
}
