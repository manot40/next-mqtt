import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['object_set'] = {
  init: function () {
    this.appendValueInput('OBJECT').setCheck('Object').appendField('Set object');
    this.appendValueInput('KEY').setCheck('String').appendField('with key');
    this.appendValueInput('VALUE').setCheck(null).appendField('Value:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour('#228BE6');
  },
};

jsGen['object_set'] = function (block: Blockly.Block) {
  const object = jsGen.valueToCode(block, 'OBJECT', jsGen.ORDER_ATOMIC);

  const key = jsGen.valueToCode(block, 'KEY', jsGen.ORDER_ATOMIC).replace(/['"]+/g, '');
  // .split('.')
  // .reduce((acc: string, curr: string) => `${acc}[${curr}]`, '');

  const value = jsGen.valueToCode(block, 'VALUE', jsGen.ORDER_ATOMIC);

  if (!key) throw new Error('Key is required');
  if (!object) throw new Error('Object is required');
  if (!value) throw new Error('Value is required');

  return `(${object})${'.' + key} = ${value}[0].search(/(\\{|\\[)/) == -1 ? ${value} : JSON.parse(${value});\n`;
};