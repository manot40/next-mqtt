import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useChannel, useSession } from 'stores';

import Link from 'next/link';
import { Empty } from 'components/reusable';
import { CreateChannel } from 'components/Channel';
import { Card, Flex, Modal, Tabs, Text } from '@mantine/core';

import { IconFileBroken, IconPlus } from '@tabler/icons';

type Props = {} & Instance;

export default function ChanList({ clientOpts: opts }: Props) {
  const { push, pathname, query } = useRouter();
  const path = pathname.replace(/(\[clientId\])/, query.clientId as string).replace(/\/\[chanId\]/, '');

  const [modal, setModal] = useDisclosure(false);

  const session = useSession((state) => state.data)[opts.clientId];
  const channels = useChannel((state) => state.data)[opts.clientId];

  const handleChannelCreated = (chan: Channel) => {
    session?.subscribe(chan.topic, { qos: chan.qos as any });
    push(`${path}/${chan.topic}`);
    setModal.close();
  };

  return (
    <div>
      <Flex gap={8}>
        <Tabs variant="pills" styles={tabStyle} defaultValue={query.chanId as string}>
          <Tabs.List>
            {channels?.map((chan) => (
              <Link href={`${path}/${chan.topic}`} key={chan.topic} style={{ textDecoration: 'none' }}>
                <Tabs.Tab value={chan.topic}>{chan.topic[0].toUpperCase() + chan.topic.slice(1)}</Tabs.Tab>
              </Link>
            ))}
          </Tabs.List>
        </Tabs>
        <Flex h={24} py={16} align="center" onClick={setModal.open} style={{ cursor: 'pointer' }}>
          <IconPlus size={21} stroke={1.6} />
          {!channels && (
            <Text ml={4} size={14} component="span">
              New Channel
            </Text>
          )}
        </Flex>
      </Flex>
      {!channels && (
        <Card mt={12} shadow="xs">
          <Empty Icon={IconFileBroken} title="No Channel Found" message="You need to create new channel" />
        </Card>
      )}
      <Modal title="Create New Channel" opened={modal} onClose={setModal.close}>
        <CreateChannel id={opts.clientId} onSubmitted={handleChannelCreated} />
      </Modal>
    </div>
  );
}

const tabStyle: { [key: string]: React.CSSProperties } = {
  root: { overflowX: 'auto' },
  tabsList: { maxWidth: 'calc(100vw - 16px)', flexWrap: 'nowrap' },
};
