import { memo } from 'react';

import BlockEditor from './BlockEditor';
import { Flex, Modal } from '@mantine/core';

type FunctionEditorProps = {
  name: string;
  opts: ClientOpts;
  active: boolean;
  onClose: () => void;
};

const Component = ({ name, opts, active, onClose }: FunctionEditorProps) => {
  return (
    <Modal fullScreen title={`Customize trigger functions for ${name}`} opened={active} onClose={onClose}>
      <Flex>
        <BlockEditor clientId={opts.clientId} />
      </Flex>
    </Modal>
  );
};

export const Editor = memo(Component);
