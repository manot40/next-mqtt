import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInstance } from 'stores';

import { Flex } from '@mantine/core';
import * as Message from 'components/Message';
import InstanceLayout from 'layouts/InstanceLayout';

export default function ActiveInstance() {
  const { query, asPath } = useRouter();

  const instances = useInstance((state) => state.data);

  const instance = useMemo(
    () => instances.find((instance) => instance.clientOpts.clientId === query.clientId) || null,
    [instances, query.clientId]
  );

  const isGlobal = asPath.slice(-1) == '#';

  return (
    <InstanceLayout data={instance}>
      {instance && (
        <Flex direction={{ base: 'column', sm: 'row' }} gap={12}>
          <Message.List
            global={isGlobal}
            channel={query.channels as string[]}
            clientId={instance.clientOpts.clientId}
          />
        </Flex>
      )}
    </InstanceLayout>
  );
}
