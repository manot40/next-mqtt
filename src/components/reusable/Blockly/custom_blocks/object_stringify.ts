import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['object_stringify'] = {
  init: function () {
    this.appendValueInput('OBJECT').setCheck('Object').appendField('Object to String');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#228BE6');
  },
};

jsGen['object_stringify'] = function (block: Blockly.Block) {
  const object = jsGen.valueToCode(block, 'OBJECT', jsGen.ORDER_ATOMIC);

  if (!object) throw new Error('Object is required');

  return [`JSON.stringify(${object})`, jsGen.ORDER_ATOMIC];
};
