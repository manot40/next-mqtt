import { memo, useState } from 'react';

import useScript, { type ScriptDefinition } from 'stores/useScript';

import BlockEditor from './BlockEditor';
import { Flex, Modal } from '@mantine/core';

type FunctionEditorProps = {
  name: string;
  opts: ClientOpts;
  active: boolean;
  onClose: () => void;
};

const Component = ({ name, opts, active, onClose }: FunctionEditorProps) => {
  const scripts = useScript((state) => state.data)[opts.clientId];
  const [focused, setFocused] = useState<ScriptDefinition>();

  return (
    <Modal fullScreen title={`Customize trigger functions for ${name}`} opened={active} onClose={onClose}>
      <Flex>
        <BlockEditor script={focused} clientId={opts.clientId} />
      </Flex>
    </Modal>
  );
};

export const Editor = memo(Component);
