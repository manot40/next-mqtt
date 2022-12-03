import { Stack } from '@mantine/core';
import * as Instance from 'components/Instance';

type Props = {
  data: Instance;
  children?: React.ReactNode;
};

export default function InstanceLayout({ data, children }: Props) {
  return (
    <Stack spacing={12}>
      <Stack spacing={42}>
        <Instance.Meta {...data} />
        <Instance.ChanList {...data} />
      </Stack>
      {children}
    </Stack>
  );
}
