import { memo } from 'react';

import { IconLambda } from '@tabler/icons';
import { Empty } from 'components/reusable';
import { Card, Flex, Stack } from '@mantine/core';

type Props = {};

export const TriggeredFunction = memo(function Component({}: Props) {
  return (
    <Stack miw={{ base: 'auto', md: '30%' }} mah="100%">
      <Flex w="100%" h="100%" justify="center" align="center">
        <Empty Icon={IconLambda} title="Function" message="Any event triggered function will shown here" />
      </Flex>
    </Stack>
  );
});
