import { useMemo } from 'react';
import { useMessage } from 'stores';

type Props = {
  channel: string;
  clientId: string;
};

export default function MessageList({ channel, clientId }: Props) {
  const messages = useMessage((state) => state.data)[clientId];

  const chanMessage = useMemo(
    () => messages?.filter((message) => message.topic === channel) || null,
    [messages, channel]
  );

  return (
    <>
      {chanMessage?.map((message) => (
        <div key={message.epoch}>{message.message}</div>
      ))}
    </>
  );
}
