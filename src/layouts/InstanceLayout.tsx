import { Empty } from 'components/reusable';
import { Flex, Stack } from '@mantine/core';
import { IconError404 } from '@tabler/icons';

import { Meta } from 'components/Instance';
import { ChanList } from 'components/Channel';

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
    <Stack spacing={12}>
      <Stack spacing={42}>
        <Meta {...data} />
        <ChanList {...data} />
      </Stack>
      {children}
    </Stack>
  );
}
