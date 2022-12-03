import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useChannel, useInstance } from 'stores';

import { Card } from '@mantine/core';
import { Empty } from 'components/resuable';
import InstanceLayout from 'layouts/InstanceLayout';

export default function ActiveInstance() {
  const { query } = useRouter();

  const instances = useInstance((state) => state.data);

  const instance = useMemo(
    () => instances.find((instance) => instance.clientOpts.clientId === query.clientId),
    [instances, query.clientId]
  );

  const chan = useChannel((state) => state.data);

  if (!instance) return null;

  return (
    <InstanceLayout data={instance}>
      {chan[instance.clientOpts.clientId] && (
        <Card shadow="xs">
          <Empty title="Pick One of Channel Above" />
        </Card>
      )}
    </InstanceLayout>
  );
}
