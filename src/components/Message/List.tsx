import { useMemo } from 'react';
import { useMessage } from 'stores';

import { Empty } from 'components/reusable';
import { IconMessageDots } from '@tabler/icons';
import { Card, Text, Stack } from '@mantine/core';

type Props = {
  channel?: string;
  clientId: string;
};

export default function MessageList({ channel, clientId }: Props) {
  const messages = useMessage((state) => state.data)[clientId];

  const chanMessage = useMemo(
    () => messages?.filter((message) => (channel ? message.topic === channel : true)) || null,
    [messages, channel]
  );

  if ((!chanMessage || chanMessage.length == 0) && channel)
    return (
      <Card w="100%" shadow="xs">
        <Empty Icon={IconMessageDots} title="This topic doesn't have any message yet" />
      </Card>
    );

  return (
    <Stack w="100%">
      {chanMessage?.map((message) => (
        <Card withBorder w="100%" key={message.epoch}>
          <Text size={18}>{message.message}</Text>
          <Text size={12} opacity={0.66}>
            {Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(message.epoch))}
          </Text>
        </Card>
      ))}
    </Stack>
  );
}
