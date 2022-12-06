import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInstance } from 'stores';

import { Flex } from '@mantine/core';
import * as Message from 'components/Message';
import InstanceLayout from 'layouts/InstanceLayout';

export default function ActiveInstance() {
  const { query } = useRouter();

  const instances = useInstance((state) => state.data);

  const instance = useMemo(
    () => instances.find((instance) => instance.clientOpts.clientId === query.clientId) || null,
    [instances, query.clientId]
  );

  return (
    <InstanceLayout data={instance}>
      {instance && (
        <Flex direction={{ base: 'column', sm: 'row' }} gap={12}>
          <Message.List global={true} clientId={instance.clientOpts.clientId} />
        </Flex>
      )}
    </InstanceLayout>
  );
}
