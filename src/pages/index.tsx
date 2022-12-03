import { Card } from '@mantine/core';
import { Empty } from 'components/resuable';
import { IconClick } from '@tabler/icons';

export default function Home() {
  return (
    <Card shadow="xs">
      <Empty Icon={IconClick} title="No Instance Selected" message="Pick or create an instance on top menubar" />
    </Card>
  );
}
