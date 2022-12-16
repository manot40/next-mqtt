import { memo, useEffect, useRef } from 'react';

import Blockly, { Xml } from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

import { showNotification } from '@mantine/notifications';
import { triggerFunc, type FuncParams } from 'libs/triggerFunc';

import { IconBolt, IconDeviceFloppy } from '@tabler/icons';
import { Box, Button, createStyles, Group, type BoxProps } from '@mantine/core';

type Props = {
  scriptParams?: FuncParams;
  xmlData?: string;
  config?: Blockly.BlocklyOptions;
  onSubmit?: (code: string, xml: string) => void;
} & Omit<BoxProps, 'onSubmit'>;

const Component: React.FC<Props> = ({ config, xmlData, children, onSubmit, scriptParams = {}, ...rest }: Props) => {
  const { classes } = useStyles();

  const toolbox = useRef<HTMLDivElement | null>(null);
  const blockly = useRef<Blockly.WorkspaceSvg | null>(null);
  const workspace = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (workspace.current != null && toolbox.current != null) {
      blockly.current = Blockly.inject(workspace.current, {
        toolbox: toolbox.current,
        ...config,
      });

      return () => blockly.current!.dispose();
    }
    // eslint-disable-next-line
  }, [blockly, workspace, toolbox]);

  useEffect(() => {
    if (blockly.current) {
      blockly.current.clear();
      if (typeof xmlData == 'string') {
        const xml = Xml.textToDom(xmlData);
        Xml.domToWorkspace(xml, blockly.current);
      }
    }
  }, [xmlData]);

  const executeScript = (ws: Blockly.Workspace, save: boolean) => {
    try {
      const code = jsGen.workspaceToCode(ws);
      if (!save) triggerFunc(code, scriptParams);
      else onSubmit?.(code, Xml.domToText(Xml.workspaceToDom(ws)));
    } catch (e: any) {
      showNotification({ title: 'Error', color: 'red', message: e.message });
    }
  };

  return (
    <>
      <Box {...rest} className={`${classes.box} ${rest.className || ''}`} ref={workspace}>
        <Group spacing={8} className={classes.action}>
          <Button
            variant="subtle"
            leftIcon={<IconBolt size={20} />}
            onClick={() => executeScript(blockly.current!, false)}>
            Run
          </Button>
          <Button
            variant="filled"
            leftIcon={<IconDeviceFloppy size={20} />}
            onClick={() => executeScript(blockly.current!, true)}>
            Save
          </Button>
        </Group>
      </Box>
      <Box display="none" ref={toolbox}>
        {children}
      </Box>
    </>
  );
};

export const Workspace = memo(Component);

const useStyles = createStyles((t) => ({
  box: {
    height: 'calc(100vh - 180px)',
    position: 'relative',

    'div.blocklyTreeRow': {
      color: '#555',
    },
  },

  action: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 99,
  },
}));
