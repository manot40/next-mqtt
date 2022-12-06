import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useChannel, useSession } from 'stores';

import Link from 'next/link';
import { Empty } from 'components/reusable';
import { CreateChannel } from 'components/Channel';
import { Card, Flex, Modal, Tabs, Text } from '@mantine/core';

import { IconFileBroken, IconPlus } from '@tabler/icons';

type Props = {} & Instance;

export default function List({ clientOpts: opts }: Props) {
  const { push, query, asPath } = useRouter();

  const [modal, setModal] = useDisclosure(false);

  const session = useSession((state) => state.data)[opts.clientId];
  const channels = useChannel((state) => state.data)[opts.clientId];

  const handleChannelCreated = (chan: Channel) => {
    session?.subscribe(chan.topic, { qos: chan.qos as any });
    push(`/${query.clientId}/${chan.topic}`);
    setModal.close();
  };

  const currentChannel = isArr(query.channels)
    ? `${query.channels.join('/')}${asPath.slice(-1) == '#' ? '/#' : ''}`
    : 'all';

  return (
    <div>
      <Flex gap={8}>
        <Tabs variant="pills" styles={tabStyle} defaultValue={currentChannel}>
          <Tabs.List>
            <Link href={`/${query.clientId}`}>
              <Tabs.Tab value="all">All Topic</Tabs.Tab>
            </Link>
            {channels?.map((chan) => (
              <Link href={`/${query.clientId}/${chan.topic}`} key={chan.topic}>
                <Tabs.Tab value={chan.topic}>{chan.topic[0].toUpperCase() + chan.topic.slice(1)}</Tabs.Tab>
              </Link>
            ))}
          </Tabs.List>
        </Tabs>
        <Flex h={24} py={16} align="center" onClick={setModal.open} style={{ cursor: 'pointer' }}>
          <IconPlus size={21} stroke={1.6} />
          {!channels && (
            <Text ml={4} size={14} component="span" style={{ userSelect: 'none' }}>
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

const isArr = Array.isArray;

const tabStyle: { [key: string]: React.CSSProperties } = {
  root: { overflowX: 'auto', overflowY: 'hidden' },
  tabsList: { maxWidth: 'calc(100vw - 16px)', flexWrap: 'nowrap' },
};
