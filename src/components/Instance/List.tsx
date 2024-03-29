import { useMemo, useState, useEffect } from 'react';
import { useInstance } from 'stores';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';

import Link from 'next/link';
import { IconPlus } from '@tabler/icons';
import { Tabs, Text, Flex, Modal, createStyles } from '@mantine/core';

import { CreateInstance } from 'components/Instance';

export default function InstanceList() {
  const { query } = useRouter();
  const tabClasses = useStyles().classes;
  const [modal, setModal] = useDisclosure(false);

  // This is a workaround for the hydration issue
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const instances = useInstance((state) => state.data);
  const TabItems = useMemo(
    () =>
      hydrated &&
      instances.map(({ name, clientOpts }) => (
        <Link href={`/${clientOpts.clientId}`} key={clientOpts.clientId}>
          <Tabs.Tab value={clientOpts.clientId}>{name || 'Blank'}</Tabs.Tab>
        </Link>
      )),
    [hydrated, instances]
  );

  return (
    <>
      <Flex gap={8}>
        <Tabs value={query.clientId as string} classNames={tabClasses}>
          <Tabs.List>{TabItems}</Tabs.List>
        </Tabs>
        <Flex h={24} py={16} align="center" onClick={setModal.open} style={{ cursor: 'pointer' }}>
          <IconPlus size={21} stroke={1.6} />
          {!TabItems && (
            <Text ml={4} size={14} component="span" style={{ userSelect: 'none' }}>
              New Instance
            </Text>
          )}
        </Flex>
      </Flex>
      <Modal title="New Instance" opened={modal} onClose={setModal.close}>
        <CreateInstance onSubmitted={setModal.close} />
      </Modal>
    </>
  );
}

const useStyles = createStyles(() => ({
  root: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },

  tabsList: {
    flexWrap: 'nowrap',
    borderBottom: '0 !important',
    maxWidth: 'calc(100vw - 16px)',
  },

  tab: {
    height: '100%',
    fontWeight: 400,
    borderBottom: 1,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: 'transparent',
      borderBottom: '1px solid #C0C0C0',
    },

    '&[data-active]': {
      fontWeight: 600,
      borderBottom: '1px solid #228be6',
    },
  },
}));
