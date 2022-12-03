import { connect } from 'libs/mqtt';

import { useState } from 'react';
import { useInstance } from 'stores';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';

import { showNotification } from '@mantine/notifications';
import { Stack, TextInput, PasswordInput, NumberInput, Button, Group, Switch, Accordion } from '@mantine/core';

type Props = {
  isEdit?: boolean;
  onSubmitted?: () => void;
  defaultWillValue?: ClientOpts['will'];
  defaultMetaValue?: Omit<ClientOpts, 'will'> & { name: string };
};

export default function CreateInstance({ isEdit, defaultMetaValue, defaultWillValue, onSubmitted }: Props) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const [create, update] = useInstance((state) => [state.create, state.update]);

  const { onSubmit: metaOnSubmit, getInputProps: metaInputProps } = useForm({
    initialValues: defaultMetaValue || {
      name: '',
      ssl: true,
      hostname: '',
      port: 8884,
      username: '',
      password: '',
      clientId: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
      keepalive: 60,
    },
    validate: {
      name: (value) => !value && 'Name is required',
      hostname: (value) => !value && 'Host is required',
      port: (value) => !value && 'Port is required',
    },
  });

  const { onSubmit: willOnSubmit, getInputProps: willInputProps } = useForm({
    initialValues: defaultWillValue || ({} as ClientOpts['will']),
  });

  const handleSubmit = async ({ name, clientOpts: opts }: Instance) => {
    try {
      setLoading(true);
      const client = await connect(opts);
      if (isEdit) {
        update(opts.clientId, { name, clientOpts: opts });
      } else {
        create(name, opts);
        push(`/${opts.clientId}`);
      }
      client.end();
      onSubmitted?.();
      showNotification({
        color: 'green',
        title: 'Success',
        message: 'Successfully created/updated the instance',
      });
    } catch (err: any) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: `Failed connecting to MQTT service. ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const mergeSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    const merged = {} as Instance;
    metaOnSubmit(({ name, ...opts }) => {
      merged.name = name;
      merged.clientOpts = opts;
    })(e);
    willOnSubmit((data) => {
      if (Object.keys(data).length) merged.clientOpts.will = data;
    })(e);
    handleSubmit(merged);
  };

  return (
    // @ts-ignore
    <form onSubmit={mergeSubmitData}>
      <Stack spacing={12}>
        <TextInput withAsterisk label="Instance Name" {...metaInputProps('name')} />

        <Group noWrap>
          <TextInput withAsterisk w="100%" label="Hostname" {...metaInputProps('hostname')} />
          <NumberInput withAsterisk w={120} label="Port" {...metaInputProps('port')} />
        </Group>

        <TextInput label="Username" {...metaInputProps('username')} />

        <PasswordInput label="Password" {...metaInputProps('password')} />

        <Accordion variant="filled">
          <Accordion.Item value="advanced">
            <Accordion.Control>Advanced Settings</Accordion.Control>
            <Accordion.Panel>
              <Stack spacing={8}>
                <Group noWrap>
                  <NumberInput label="Keepalive" {...metaInputProps('keepalive')} />
                  <Switch offLabel="OFF" onLabel="ON" label="SSL" {...metaInputProps('ssl', { type: 'checkbox' })} />
                </Group>
                <Group noWrap>
                  <TextInput w="100%" label="Last-Will Topic" {...willInputProps('topic')} />
                  <NumberInput w={120} label="Qos" {...willInputProps('qos')} />
                </Group>
                <TextInput label="Last-Will Message" {...willInputProps('payload')} />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <div />
        <Button loading={loading} type="submit">
          Submit Data
        </Button>
      </Stack>
    </form>
  );
}
