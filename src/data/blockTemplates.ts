import { BlockTemplate } from '@/types/blocks';

export const blockTemplates: BlockTemplate[] = [
  // Includes/Imports
  {
    id: 'include-stdio',
    category: 'includes',
    label: '#include <stdio.h>',
    code: {
      c: '#include <stdio.h>',
      java: 'import java.util.Scanner;',
      python: '# No imports needed for basic I/O'
    },
    color: 'block-variables'
  },
  {
    id: 'include-stdlib',
    category: 'includes',
    label: '#include <stdlib.h>',
    code: {
      c: '#include <stdlib.h>',
      java: 'import java.lang.*;',
      python: 'import sys'
    },
    color: 'block-variables'
  },
  
  // Input/Output
  {
    id: 'printf',
    category: 'io',
    label: 'print message',
    code: {
      c: 'printf("{text}\\n");',
      python: 'print("{text}")',
      java: 'System.out.println("{text}");'
    },
    inputs: [
      { name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }
    ],
    color: 'block-looks'
  },
  {
    id: 'scanf-int',
    category: 'io',
    label: 'read integer',
    code: {
      c: 'scanf("%d", &{var});',
      python: '{var} = int(input())',
      java: '{var} = scanner.nextInt();'
    },
    inputs: [
      { name: 'var', placeholder: 'number', defaultValue: 'num' }
    ],
    color: 'block-sound'
  },
  {
    id: 'scanf-string',
    category: 'io',
    label: 'read string',
    code: {
      c: 'scanf("%s", {var});',
      python: '{var} = input()',
      java: '{var} = scanner.next();'
    },
    inputs: [
      { name: 'var', placeholder: 'text', defaultValue: 'str' }
    ],
    color: 'block-sound'
  },
  
  // Variables
  {
    id: 'int-declare',
    category: 'variables',
    label: 'create integer',
    code: {
      c: 'int {name} = {value};',
      python: '{name} = {value}',
      java: 'int {name} = {value};'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    color: 'block-operators'
  },
  {
    id: 'string-declare',
    category: 'variables',
    label: 'create string',
    code: {
      c: 'char {name}[100] = "{value}";',
      python: '{name} = "{value}"',
      java: 'String {name} = "{value}";'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    color: 'block-operators'
  },
  
  // Conditionals
  {
    id: 'if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: {
      c: 'if ({condition}) {',
      python: 'if {condition}:',
      java: 'if ({condition}) {'
    },
    inputs: [
      { name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }
    ],
    color: 'block-control'
  },
  {
    id: 'else-statement',
    category: 'conditionals',
    label: 'else',
    code: {
      c: '} else {',
      python: 'else:',
      java: '} else {'
    },
    color: 'block-control'
  },
  {
    id: 'end-block',
    category: 'conditionals',
    label: 'end block',
    code: {
      c: '}',
      python: '# end block',
      java: '}'
    },
    color: 'block-control'
  },
  
  // Loops
  {
    id: 'for-loop',
    category: 'loops',
    label: 'for loop',
    code: {
      c: 'for (int {var} = {start}; {var} < {end}; {var}++) {',
      python: 'for {var} in range({start}, {end}):',
      java: 'for (int {var} = {start}; {var} < {end}; {var}++) {'
    },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    color: 'block-motion'
  },
  {
    id: 'while-loop',
    category: 'loops',
    label: 'while loop',
    code: {
      c: 'while ({condition}) {',
      python: 'while {condition}:',
      java: 'while ({condition}) {'
    },
    inputs: [
      { name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }
    ],
    color: 'block-motion'
  },
  
  // Functions
  {
    id: 'main-function',
    category: 'functions',
    label: 'main function',
    code: {
      c: 'int main() {',
      python: 'def main():',
      java: 'public static void main(String[] args) {'
    },
    color: 'block-events'
  },
  {
    id: 'return-statement',
    category: 'functions',
    label: 'return',
    code: {
      c: 'return {value};',
      python: 'return {value}',
      java: 'return {value};'
    },
    inputs: [
      { name: 'value', placeholder: '0', defaultValue: '0' }
    ],
    color: 'block-events'
  },
  
  // Operators
  {
    id: 'assign',
    category: 'operators',
    label: 'set variable',
    code: {
      c: '{var} = {value};',
      python: '{var} = {value}',
      java: '{var} = {value};'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    color: 'block-sensing'
  },
  {
    id: 'increment',
    category: 'operators',
    label: 'increment',
    code: {
      c: '{var}++;',
      python: '{var} += 1',
      java: '{var}++;'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' }
    ],
    color: 'block-sensing'
  },

  // Syntax Elements
  {
    id: 'opening-brace',
    category: 'syntax',
    label: 'opening brace {',
    code: {
      c: '{',
      python: '# {',
      java: '{'
    },
    color: 'block-extension'
  },
  {
    id: 'closing-brace',
    category: 'syntax',
    label: 'closing brace }',
    code: {
      c: '}',
      python: '# }',
      java: '}'
    },
    color: 'block-extension'
  },
  {
    id: 'semicolon',
    category: 'syntax',
    label: 'semicolon ;',
    code: {
      c: ';',
      python: '# ;',
      java: ';'
    },
    color: 'block-extension'
  },
  {
    id: 'opening-paren',
    category: 'syntax',
    label: 'opening parenthesis (',
    code: {
      c: '(',
      python: '(',
      java: '('
    },
    color: 'block-extension'
  },
  {
    id: 'closing-paren',
    category: 'syntax',
    label: 'closing parenthesis )',
    code: {
      c: ')',
      python: ')',
      java: ')'
    },
    color: 'block-extension'
  },
  {
    id: 'comma',
    category: 'syntax',
    label: 'comma ,',
    code: {
      c: ',',
      python: ',',
      java: ','
    },
    color: 'block-extension'
  },
  {
    id: 'custom-code',
    category: 'syntax',
    label: 'custom code',
    code: {
      c: '{code}',
      python: '{code}',
      java: '{code}'
    },
    inputs: [
      { name: 'code', placeholder: 'Write your code here...', defaultValue: '' }
    ],
    color: 'block-extension'
  }
];

export const getBlocksByCategory = (category: string) => 
  blockTemplates.filter(block => block.category === category);

export const getBlockById = (id: string) => 
  blockTemplates.find(block => block.id === id);