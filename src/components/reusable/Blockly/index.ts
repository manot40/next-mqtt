import { createElement, memo } from 'react';

export { Workspace } from './Workspace';

/* Block Section */
export type BlockProps = {
  type: BlockType;
  children?: React.ReactNode;
};
export const Block = memo(function BlockComponent(props: BlockProps) {
  const { children, ...rest } = props as BlockProps & { is: string };
  rest.is = 'blockly';
  return createElement('block', rest, children);
});

/* Category Section */
export type CategoryProps = {
  name: string;
  colour?: string;
  children?: React.ReactNode;
};
export const Category = memo(function CategoryComponent(props: CategoryProps) {
  const { children, ...rest } = props as CategoryProps & { is: string };
  rest.is = 'blockly';
  return createElement('category', rest, children);
});

export type BlockType =
  | 'colour_blend'
  | 'colour_picker'
  | 'colour_random'
  | 'colour_rgb'
  | 'controls_flow_statements'
  | 'controls_for'
  | 'controls_forEach'
  | 'controls_if'
  | 'controls_ifelse'
  | 'controls_repeat'
  | 'controls_repeat_ext'
  | 'controls_whileUntil'
  | 'lists_create_with'
  | 'lists_getIndex'
  | 'lists_getSublist'
  | 'lists_indexOf'
  | 'lists_isEmpty'
  | 'lists_length'
  | 'lists_repeat'
  | 'lists_reverse'
  | 'lists_setIndex'
  | 'lists_sort'
  | 'lists_split'
  | 'logic_boolean'
  | 'logic_compare'
  | 'logic_negate'
  | 'logic_null'
  | 'logic_operation'
  | 'logic_ternary'
  | 'math_arithmetic'
  | 'math_atan2'
  | 'math_constant'
  | 'math_constrain'
  | 'math_modulo'
  | 'math_number'
  | 'math_number_property'
  | 'math_on_list'
  | 'math_random_float'
  | 'math_random_int'
  | 'math_round'
  | 'math_single'
  | 'math_trig'
  | 'text'
  | 'text_append'
  | 'text_changeCase'
  | 'text_charAt'
  | 'text_count'
  | 'text_getSubstring'
  | 'text_indexOf'
  | 'text_isEmpty'
  | 'text_join'
  | 'text_length'
  | 'text_multiline'
  | 'text_print'
  | 'text_prompt_ext'
  | 'text_replace'
  | 'text_reverse'
  | 'text_trim'
  | 'variables_get'
  | 'variables_set'
  | 'variables_set_dynamic'
  | 'variables_get_dynamic'
  | 'procedures_defnoreturn'
  | 'procedures_defreturn'
  | 'procedures_ifreturn'
  | 'procedures_mutatorcontainer'
  | 'procedures_mutatorarg';
