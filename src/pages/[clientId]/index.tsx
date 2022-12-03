import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useChannel, useInstance } from 'stores';

import { Card } from '@mantine/core';
import { Empty } from 'components/resuable';
import InstanceLayout from 'layouts/InstanceLayout';

import { IconClick } from '@tabler/icons';

export default function ActiveInstance() {
  const { query } = useRouter();

  const instances = useInstance((state) => state.data);

  const instance = useMemo(
    () => instances.find((instance) => instance.clientOpts.clientId === query.clientId) || null,
    [instances, query.clientId]
  );

  const chan = useChannel((state) => state.data);

  return (
    <InstanceLayout data={instance}>
      {chan[instance?.clientOpts.clientId || 'null'] && (
        <Card shadow="xs">
          <Empty Icon={IconClick} title="Pick Channel From Above" />
        </Card>
      )}
    </InstanceLayout>
  );
}
