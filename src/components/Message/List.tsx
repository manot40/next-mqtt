import { useMemo } from 'react';
import { useMessage } from 'stores';

import { Empty } from 'components/reusable';
import { IconMessageDots } from '@tabler/icons';
import { Card, Text, Stack, Flex, Badge } from '@mantine/core';

type Props = {
  global: boolean;
  channel?: string[];
  clientId: string;
};

export default function MessageList({ global, channel: _channel, clientId }: Props) {
  const messageStore = useMessage((state) => state.data)[clientId];

  const channel = useMemo(() => (global && _channel ? [..._channel, '#'] : _channel), [global, _channel]);

  const messages = useMemo(
    () =>
      channel
        ? messageStore?.filter((message) => {
            const result = [] as boolean[];
            const topic = message.topic.split('/');

            for (const i in topic)
              if (channel[i] === '#') {
                result.push(true);
                break;
              } else {
                result.push(topic[i] === channel[i]);
              }

            return result.every((value) => value);
          })
        : messageStore,
    // eslint-disable-next-line
    [messageStore, channel]
  );

  if ((!messages || messages.length == 0) && channel)
    return (
      <Card w="100%" shadow="xs">
        <Empty Icon={IconMessageDots} title="This topic doesn't have any message yet" />
      </Card>
    );

  return (
    <Stack spacing={8} w="100%">
      {messages?.map((message) => (
        <Card p="xs" withBorder w="100%" key={message.epoch}>
          <Flex justify="space-between">
            <div>
              <Text size={18}>{message.message}</Text>
              <Text size={12} opacity={0.66}>
                {Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(
                  new Date(message.epoch)
                )}
              </Text>
            </div>
            <div>
              <Badge color="blue">{message.topic}</Badge>
            </div>
          </Flex>
        </Card>
      ))}
    </Stack>
  );
}
