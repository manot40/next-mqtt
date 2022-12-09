import { useForm } from '@mantine/form';
import { useSession } from 'stores';

import { showNotification } from '@mantine/notifications';
import { TopicAutocomplete } from 'components/reusable';
import { Group, NumberInput, Stack, Textarea, Switch, Button } from '@mantine/core';

type Props = {
  clientId: string;
};

export default function CreateMessage({ clientId }: Props) {
  const session = useSession((state) => state.data)[clientId]!;

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
          <TopicAutocomplete label="Topic Name" clientId={clientId} {...getInputProps('topic')} />
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
