import { connect } from 'libs/mqtt';

import { useState } from 'react';
import { useSession } from 'stores';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';

import ActionMenu from './ActionMenu';
import { showNotification } from '@mantine/notifications';
import { Title, Text, Stack, Flex, Group, Button, Modal } from '@mantine/core';
import { CreateChannel } from 'components/Channel';

type Props = {} & Instance;

export default function Meta({ name, clientOpts: opts }: Props) {
  const { push, pathname, query } = useRouter();
  const path = pathname.replace(/(\[clientId\])/, query.clientId as string);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useDisclosure(false);

  const session = useSession((state) => state.data)[opts.clientId];
  const [addClient, removeClient] = useSession((state) => [state.add, state.remove]);

  const createConnection = async () => {
    try {
      setLoading(true);
      if (session) {
        session.end();
        removeClient(opts.clientId);
      } else {
        const client = await connect(opts);
        addClient(opts.clientId, client);
      }

      showNotification({
        color: 'green',
        title: 'Success',
        message: `${session ? 'Disconnected from' : 'Connected to'} ${name}`,
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

  const handleChannelCreated = (chan: Channel) => {
    session!.subscribe(chan.topic, { qos: chan.qos as any });
    push(`${path}/${chan.topic}`);
    setModal.close();
  };

  return (
    <Stack>
      <Flex
        gap={12}
        direction={{ base: 'column', xs: 'row' }}
        align={{ base: 'normal', xs: 'center' }}
        justify="space-between">
        <Stack spacing={4}>
          <Title order={1} size="1.66rem">
            {name}
          </Title>
          <Text size={14}>Logged in as {opts.username}</Text>
        </Stack>

        <Group spacing={12}>
          <Button loading={loading} onClick={createConnection} color={session ? 'red' : 'blue'} size="sm">
            {session ? 'Disconnect' : 'Connect'}
          </Button>
          {session && (
            <Button loading={loading} onClick={setModal.open} variant="outline" size="sm">
              New Channel
            </Button>
          )}
          <ActionMenu name={name} clientOpts={opts} />
        </Group>
      </Flex>
      <Modal title="Create New Channel" opened={modal} onClose={setModal.close}>
        <CreateChannel id={opts.clientId} onSubmitted={handleChannelCreated} />
      </Modal>
    </Stack>
  );
}
