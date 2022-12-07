import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['object_keys'] = {
  init: function () {
    this.appendValueInput('OBJECT').setCheck('Object').appendField('Object Keys');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setColour('#228BE6');
  },
};

jsGen['object_keys'] = function (block: Blockly.Block) {
  const object = jsGen.valueToCode(block, 'OBJECT', jsGen.ORDER_ATOMIC);

  if (!object) throw new Error('Object is required');

  return [`Object.keys(${object})`, jsGen.ORDER_ATOMIC];
};
