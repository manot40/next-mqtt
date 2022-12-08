import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['object_parse'] = {
  init: function () {
    this.appendValueInput('OBJECT').setCheck('String').appendField('turn text');
    this.appendDummyInput().appendField('into an object');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#228BE6');
  },
};

jsGen['object_parse'] = function (block: Blockly.Block) {
  const input = jsGen.valueToCode(block, 'OBJECT', jsGen.ORDER_ATOMIC);

  if (!input) throw new Error('String input is required');

  return [`JSON.parse(${input})`, jsGen.ORDER_ATOMIC];
};
