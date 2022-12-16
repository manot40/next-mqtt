import { memo, useState } from 'react';

import useScript, { type ScriptDefinition } from 'stores/useScript';

import FunctionList from './FunctionList';
import BlockEditor from './BlockEditor';
import { Button, Flex, Modal, Stack, Title } from '@mantine/core';

type FunctionEditorProps = {
  name: string;
  opts: ClientOpts;
  active: boolean;
  onClose: () => void;
};

const Component = ({ name, opts, active, onClose }: FunctionEditorProps) => {
  const scripts = useScript((state) => state.data)[opts.clientId];
  const [focus, setFocus] = useState<ScriptDefinition>();

  return (
    <Modal fullScreen title={`Customize trigger functions for ${name}`} opened={active} onClose={onClose}>
      <Flex gap={24} direction={{ base: 'column', md: 'row' }}>
        <Stack spacing={18} w={{ base: '100%', md: '25%', lg: '20%' }}>
          <Flex justify="space-between">
            <Title m="auto 0" order={1} size={18}>
              Functions
            </Title>
            <Button onClick={() => setFocus(undefined)} size="sm" variant="light">
              Create
            </Button>
          </Flex>
          <FunctionList focus={focus} onFocusChange={setFocus} data={scripts} />
        </Stack>
        <BlockEditor focus={focus} clientId={opts.clientId} />
      </Flex>
    </Modal>
  );
};

export const Editor = memo(Component);
