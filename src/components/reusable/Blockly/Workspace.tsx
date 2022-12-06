import { useEffect, useRef } from 'react';

import { Box, Button, createStyles, type BoxProps } from '@mantine/core';

import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';
import { showNotification } from '@mantine/notifications';

type Props = {
  initialXml?: string;
  config?: Blockly.BlocklyOptions;
} & BoxProps;

export function Workspace({ config, initialXml, children, ...rest }: Props) {
  const { classes } = useStyles();

  const toolbox = useRef<HTMLDivElement | null>(null);
  const blockly = useRef<Blockly.WorkspaceSvg | null>(null);
  const workspace = useRef<HTMLDivElement | null>(null);

  const generateCode = (ws: Blockly.Workspace) => {
    try {
      const code = jsGen.workspaceToCode(ws);
      alert(code);
    } catch (e: any) {
      showNotification({ title: 'Error', color: 'red', message: e.message });
    }
  };

  useEffect(() => {
    if (workspace.current != null && toolbox.current != null) {
      blockly.current = Blockly.inject(workspace.current, {
        toolbox: toolbox.current,
        ...config,
      });

      if (initialXml) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), blockly.current);
      }

      return () => blockly.current?.dispose();
    }
  }, [blockly, workspace, toolbox, initialXml, config]);

  return (
    <>
      <Box {...rest} className={`${classes.box} ${rest.className}`} ref={workspace}>
        <Button className={classes.button} onClick={() => generateCode(blockly.current!)}>
          Save Logic
        </Button>
      </Box>
      <Box display="none" ref={toolbox}>
        {children}
      </Box>
    </>
  );
}

const useStyles = createStyles((t) => ({
  box: {
    height: 'calc(100vh - 120px)',
    position: 'relative',
  },

  button: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 999,
  },
}));
