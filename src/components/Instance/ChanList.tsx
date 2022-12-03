import { useChannel } from 'stores';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Empty } from 'components/resuable';
import { Card, Tabs } from '@mantine/core';
import { IconFileBroken } from '@tabler/icons';

type Props = {} & Instance;

export default function ChanList({ clientOpts: opts }: Props) {
  const { pathname, query } = useRouter();
  const path = pathname.replace(/(\[clientId\])/, query.clientId as string);

  const channels = useChannel((state) => state.data)[opts.clientId];

  if (!channels)
    return (
      <Card shadow="xs">
        <Empty Icon={IconFileBroken} title="No Channel Found" message="You need to create new channel" />
      </Card>
    );

  return (
    <Tabs variant="pills" defaultValue={query.chanId as string}>
      <Tabs.List>
        {channels.map((chan) => (
          <Link href={`${path}/${chan.topic}`} key={chan.topic} style={{ textDecoration: 'none' }}>
            <Tabs.Tab value={chan.topic}>{chan.topic[0].toUpperCase() + chan.topic.slice(1)}</Tabs.Tab>
          </Link>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
