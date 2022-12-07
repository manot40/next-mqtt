import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['object_get'] = {
  init: function () {
    this.appendValueInput('OBJECT').setCheck('Object').appendField('Get object');
    this.appendValueInput('KEY').setCheck('String').appendField('value, with key');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#228BE6');
  },
};

jsGen['object_get'] = function (block: Blockly.Block) {
  const object = jsGen.valueToCode(block, 'OBJECT', jsGen.ORDER_ATOMIC);

  const key = jsGen.valueToCode(block, 'KEY', jsGen.ORDER_ATOMIC).replace(/['"]+/g, '');
  // .split('.')
  // .reduce((acc: string, curr: string) => `${acc}[${curr}]`, '');

  if (!key) throw new Error('Key is required');
  if (!object) throw new Error('Object is required');

  return [`(${object})${'.' + key}`, jsGen.ORDER_ATOMIC];
};
