import { Flex, Stack, Text } from '@mantine/core';

import { IconEggCracked, type TablerIcon } from '@tabler/icons';

type Props = {
  Icon?: TablerIcon;
  title: React.ReactNode;
  message?: React.ReactNode;
};

const Empty = ({ Icon = IconEggCracked, title, message }: Props) => (
  <Flex mih={360} justify="center" align="center">
    <Flex gap={12} direction="column" align="center">
      <Icon size={64} stroke={1.2} opacity={0.5} />
      <Stack spacing={4} style={{ textAlign: 'center' }}>
        <Text size={18} opacity={0.85}>
          {title}
        </Text>
        {message && (
          <Text size={14} opacity={0.65}>
            {message}
          </Text>
        )}
      </Stack>
    </Flex>
  </Flex>
);

export default Empty;
