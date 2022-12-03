import { Card } from '@mantine/core';
import { Empty } from 'components/resuable';

export default function Home() {
  return (
    <Card shadow="xs">
      <Empty title="No Instance Selected" message="Pick or create an instance on top menubar" />
    </Card>
  );
}
