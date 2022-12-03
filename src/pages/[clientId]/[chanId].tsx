import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInstance } from 'stores';

import InstanceLayout from 'layouts/InstanceLayout';

export default function ActiveInstance() {
  const { query } = useRouter();

  const instances = useInstance((state) => state.data);

  const instance = useMemo(
    () => instances.find((instance) => instance.clientOpts.clientId === query.clientId),
    [instances, query.clientId]
  );

  if (!instance) return null;

  return (
    <InstanceLayout data={instance}>
      <div>Active Instance</div>
    </InstanceLayout>
  );
}
