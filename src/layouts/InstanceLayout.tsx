import { Empty } from 'components/reusable';
import { Flex, Stack } from '@mantine/core';
import { IconError404 } from '@tabler/icons';

import { Meta } from 'components/Instance';
import { ChanList } from 'components/Channel';
import { TriggeredFunction } from 'components/Function';

type Props = {
  data: Instance | null;
  children?: React.ReactNode;
};

export default function InstanceLayout({ data, children }: Props) {
  if (!data)
    return (
      <Flex justify="center">
        <Empty Icon={IconError404} title="Instance Not Found" message="This may not what you're searching for" />
      </Flex>
    );

  return (
    <Stack spacing={42}>
      <Meta {...data} />
      <Flex gap={18} direction={{ base: 'column', md: 'row' }}>
        <Stack w="100%" spacing={12}>
          <ChanList {...data} />
          {children}
        </Stack>
        <TriggeredFunction />
      </Flex>
    </Stack>
  );
}
