import Blockly from 'blockly';
import { javascriptGenerator as jsGen } from 'blockly/javascript';

Blockly.Blocks['fetch_api'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Method')
      .appendField(
        new Blockly.FieldDropdown([
          ['GET', 'GET'],
          ['POST', 'POST'],
          ['PUT', 'PUT'],
          ['PATCH', 'PATCH'],
          ['DELETE', 'DELETE'],
        ]),
        'METHOD'
      );
    this.appendValueInput('URL').setCheck('String').appendField('URL');
    this.appendValueInput('BODY').setCheck('String').appendField('Body');
    this.appendValueInput('HEADER').setCheck('Object').appendField('Headers');
    this.appendDummyInput()
      .appendField('Parse data to')
      .appendField(
        new Blockly.FieldDropdown([
          ['Text', 'text'],
          ['JSON', 'json'],
        ]),
        'PARSE'
      );
    this.setInputsInline(false);
    this.setOutput(true, ['String', 'Object']);
    this.setColour(180);
  },
};

jsGen['fetch_api'] = function (block: Blockly.Block) {
  const method = block.getFieldValue('METHOD');
  const url = jsGen.valueToCode(block, 'URL', jsGen.ORDER_ATOMIC);
  const body = method !== 'GET' ? `body: ${jsGen.valueToCode(block, 'BODY', jsGen.ORDER_ATOMIC) || "'{}'"}` : '';
  const header = jsGen.valueToCode(block, 'HEADER', jsGen.ORDER_ATOMIC);
  const parser = block.getFieldValue('PARSE');

  if (!url) throw new Error('URL is required');

  return [
    `await fetch(${url}, {method: '${method || 'GET'}', headers: ${
      header || '{}'
    }, ${body}}).then((r) => r.${parser}())`,
    jsGen.ORDER_ATOMIC,
  ];
};
