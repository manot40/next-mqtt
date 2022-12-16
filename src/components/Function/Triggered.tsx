import { memo } from 'react';

import { useScript } from 'stores';

import { IconBolt } from '@tabler/icons';
import { Empty } from 'components/reusable';
import { Box, Card, Text, Flex, Stack, Title } from '@mantine/core';

type Props = {
  instance: string;
};

export const TriggeredFunction = memo(function Component({ instance }: Props) {
  const history = useScript((state) => state.history)[instance];
  const isHistory = history && !!history.length;

  return (
    <Box miw={{ base: 'auto', md: '30%' }} mah="100%">
      {isHistory ? (
        <div>
          <Title mb={15} order={3}>
            Executed Function
          </Title>
          <Stack spacing={8}>
            {history.map((h, i) => (
              <Card withBorder p="xs" key={i}>
                <Flex justify="space-between" align="center">
                  <Text
                    size={14}
                    weight={500}
                    sx={{
                      maxWidth: '50%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}>
                    {h.name}
                  </Text>
                  <Text size={12} weight={400}>
                    {Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(h.time)}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Stack>
        </div>
      ) : (
        <Flex w="100%" h="100%" justify="center" align="center">
          <Empty Icon={IconBolt} title="Executed Function" message="Any event triggered script will shown here" />
        </Flex>
      )}
    </Box>
  );
});
