import { Blockly } from 'components/reusable';
import { triggerFunc } from 'libs/triggerFunc';

export default function BlocklyTest() {
  return (
    <Blockly.Workspace
      onSubmit={(s) => triggerFunc(s, { topic: 'ASD' })}
      config={{
        readOnly: false,
        trashcan: true,
        move: { scrollbars: true, wheel: true, drag: true },
      }}>
      <Blockly.Category colour="%{BKY_LOGIC_HUE}" name="Logic">
        {blocks.logic.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="%{BKY_LOOPS_HUE}" name="Loops">
        {blocks.loops.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="%{BKY_MATH_HUE}" name="Math">
        {blocks.math.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="%{BKY_TEXTS_HUE}" name="Text">
        {blocks.text.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="#228BE6" name="Objects">
        {blocks.objects.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="%{BKY_LISTS_HUE}" name="Lists">
        {blocks.lists.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="%{BKY_VARIABLES_HUE}" name="Variables">
        {blocks.variables.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="%{BKY_PROCEDURES_HUE}" name="Functions">
        {blocks.functions.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
      <Blockly.Category colour="180" name="Utilties">
        {blocks.utilities.map((block, i) => (
          <Blockly.Block key={i} {...block} />
        ))}
      </Blockly.Category>
    </Blockly.Workspace>
  );
}

const blocks: { [cat: string]: Blockly.BlockProps[] } = {
  logic: [
    { type: 'controls_if' },
    { type: 'controls_ifelse' },
    { type: 'logic_operation' },
    { type: 'logic_boolean' },
    { type: 'logic_compare' },
    { type: 'logic_negate' },
    { type: 'logic_null' },
    { type: 'logic_operation' },
    { type: 'logic_ternary' },
  ],
  loops: [
    { type: 'controls_repeat_ext' },
    { type: 'controls_whileUntil' },
    { type: 'controls_for' },
    { type: 'controls_forEach' },
    { type: 'controls_flow_statements' },
  ],
  math: [
    { type: 'math_number' },
    { type: 'math_arithmetic' },
    { type: 'math_single' },
    { type: 'math_trig' },
    { type: 'math_constant' },
    { type: 'math_number_property' },
    { type: 'math_round' },
    { type: 'math_on_list' },
    { type: 'math_modulo' },
    { type: 'math_constrain' },
    { type: 'math_random_int' },
    { type: 'math_random_float' },
  ],
  text: [
    { type: 'text' },
    { type: 'text_join' },
    { type: 'text_append' },
    { type: 'text_length' },
    { type: 'text_isEmpty' },
    { type: 'text_indexOf' },
    { type: 'text_charAt' },
    { type: 'text_getSubstring' },
    { type: 'text_changeCase' },
    { type: 'text_trim' },
    { type: 'text_print' },
    { type: 'text_prompt_ext' },
  ],
  objects: [
    { type: 'object_create' },
    { type: 'object_get' },
    { type: 'object_set' },
    { type: 'object_keys' },
    { type: 'object_stringify' },
    { type: 'object_parse' },
  ],
  lists: [
    { type: 'lists_create_with' },
    { type: 'lists_repeat' },
    { type: 'lists_length' },
    { type: 'lists_isEmpty' },
    { type: 'lists_indexOf' },
    { type: 'lists_getIndex' },
    { type: 'lists_setIndex' },
    { type: 'lists_getSublist' },
    { type: 'lists_split' },
    { type: 'lists_sort' },
  ],
  variables: [{ type: 'variables_set_dynamic' }, { type: 'variables_get_dynamic' }],
  functions: [{ type: 'procedures_defreturn' }, { type: 'procedures_defnoreturn' }, { type: 'procedures_ifreturn' }],
  utilities: [{ type: 'fetch_api' }],
};
