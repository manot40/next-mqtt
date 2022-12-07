import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['object_create'] = {
  init: function () {
    this.appendDummyInput().appendField('New object');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#228BE6');
  },
};

jsGen['object_create'] = function () {
  return ['{}', jsGen.ORDER_ATOMIC];
};
