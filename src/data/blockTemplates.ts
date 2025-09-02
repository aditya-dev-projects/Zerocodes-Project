import { BlockTemplate } from '@/types/blocks';

export const blockTemplates: BlockTemplate[] = [
  // C Blocks
  {
    id: 'c-include-stdio',
    category: 'includes',
    label: '#include <stdio.h>',
    code: {
      c: '#include <stdio.h>'
    },
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-include-stdlib',
    category: 'includes',
    label: '#include <stdlib.h>',
    code: {
      c: '#include <stdlib.h>'
    },
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-main-function',
    category: 'functions',
    label: 'main function',
    code: {
      c: 'int main() {'
    },
    language: 'c',
    color: 'block-events'
  },
  {
    id: 'c-printf',
    category: 'io',
    label: 'print message',
    code: {
      c: 'printf("{text}\\n");'
    },
    inputs: [
      { name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }
    ],
    language: 'c',
    color: 'block-looks'
  },
  {
    id: 'c-scanf-int',
    category: 'io',
    label: 'read integer',
    code: {
      c: 'scanf("%d", &{var});'
    },
    inputs: [
      { name: 'var', placeholder: 'number', defaultValue: 'num' }
    ],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-scanf-string',
    category: 'io',
    label: 'read string',
    code: {
      c: 'scanf("%s", {var});'
    },
    inputs: [
      { name: 'var', placeholder: 'text', defaultValue: 'str' }
    ],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-int-declare',
    category: 'variables',
    label: 'create integer',
    code: {
      c: 'int {name} = {value};'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    language: 'c',
    color: 'block-operators'
  },
  {
    id: 'c-string-declare',
    category: 'variables',
    label: 'create string',
    code: {
      c: 'char {name}[100] = "{value}";'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    language: 'c',
    color: 'block-operators'
  },
  {
    id: 'c-if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: {
      c: 'if ({condition}) {'
    },
    inputs: [
      { name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }
    ],
    language: 'c',
    color: 'block-control'
  },
  {
    id: 'c-else-statement',
    category: 'conditionals',
    label: 'else',
    code: {
      c: '} else {'
    },
    language: 'c',
    color: 'block-control'
  },
  {
    id: 'c-for-loop',
    category: 'loops',
    label: 'for loop',
    code: {
      c: 'for (int {var} = {start}; {var} < {end}; {var}++) {'
    },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    language: 'c',
    color: 'block-motion'
  },
  {
    id: 'c-while-loop',
    category: 'loops',
    label: 'while loop',
    code: {
      c: 'while ({condition}) {'
    },
    inputs: [
      { name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }
    ],
    language: 'c',
    color: 'block-motion'
  },
  {
    id: 'c-return-statement',
    category: 'functions',
    label: 'return',
    code: {
      c: 'return {value};'
    },
    inputs: [
      { name: 'value', placeholder: '0', defaultValue: '0' }
    ],
    language: 'c',
    color: 'block-events'
  },
  {
    id: 'c-assign',
    category: 'operators',
    label: 'set variable',
    code: {
      c: '{var} = {value};'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    language: 'c',
    color: 'block-sensing'
  },
  {
    id: 'c-increment',
    category: 'operators',
    label: 'increment',
    code: {
      c: '{var}++;'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' }
    ],
    language: 'c',
    color: 'block-sensing'
  },

  // Java Blocks
  {
    id: 'java-scanner-import',
    category: 'includes',
    label: 'import java.util.Scanner',
    code: {
      java: 'import java.util.Scanner;'
    },
    language: 'java',
    color: 'block-variables'
  },
  {
    id: 'java-class-declaration',
    category: 'includes',
    label: 'Java Class Declaration',
    code: {
      java: 'public class Main {'
    },
    language: 'java',
    color: 'block-variables'
  },
  {
    id: 'java-main-method',
    category: 'functions',
    label: 'Java Main Method',
    code: {
      java: 'public static void main(String[] args) {'
    },
    language: 'java',
    color: 'block-events'
  },
  {
    id: 'java-scanner',
    category: 'io',
    label: 'Java Scanner',
    code: {
      java: 'Scanner scanner = new Scanner(System.in);'
    },
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-println',
    category: 'io',
    label: 'print message',
    code: {
      java: 'System.out.println("{text}");'
    },
    inputs: [
      { name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }
    ],
    language: 'java',
    color: 'block-looks'
  },
  {
    id: 'java-nextInt',
    category: 'io',
    label: 'read integer',
    code: {
      java: '{var} = scanner.nextInt();'
    },
    inputs: [
      { name: 'var', placeholder: 'number', defaultValue: 'num' }
    ],
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-next',
    category: 'io',
    label: 'read string',
    code: {
      java: '{var} = scanner.next();'
    },
    inputs: [
      { name: 'var', placeholder: 'text', defaultValue: 'str' }
    ],
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-int-declare',
    category: 'variables',
    label: 'create integer',
    code: {
      java: 'int {name} = {value};'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    language: 'java',
    color: 'block-operators'
  },
  {
    id: 'java-string-declare',
    category: 'variables',
    label: 'create string',
    code: {
      java: 'String {name} = "{value}";'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    language: 'java',
    color: 'block-operators'
  },
  {
    id: 'java-if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: {
      java: 'if ({condition}) {'
    },
    inputs: [
      { name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }
    ],
    language: 'java',
    color: 'block-control'
  },
  {
    id: 'java-else-statement',
    category: 'conditionals',
    label: 'else',
    code: {
      java: '} else {'
    },
    language: 'java',
    color: 'block-control'
  },
  {
    id: 'java-for-loop',
    category: 'loops',
    label: 'for loop',
    code: {
      java: 'for (int {var} = {start}; {var} < {end}; {var}++) {'
    },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    language: 'java',
    color: 'block-motion'
  },
  {
    id: 'java-while-loop',
    category: 'loops',
    label: 'while loop',
    code: {
      java: 'while ({condition}) {'
    },
    inputs: [
      { name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }
    ],
    language: 'java',
    color: 'block-motion'
  },
  {
    id: 'java-return-statement',
    category: 'functions',
    label: 'return',
    code: {
      java: 'return {value};'
    },
    inputs: [
      { name: 'value', placeholder: '0', defaultValue: '0' }
    ],
    language: 'java',
    color: 'block-events'
  },
  {
    id: 'java-assign',
    category: 'operators',
    label: 'set variable',
    code: {
      java: '{var} = {value};'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    language: 'java',
    color: 'block-sensing'
  },
  {
    id: 'java-increment',
    category: 'operators',
    label: 'increment',
    code: {
      java: '{var}++;'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' }
    ],
    language: 'java',
    color: 'block-sensing'
  },

  // Python Blocks
  {
    id: 'python-main-block',
    category: 'includes',
    label: 'Python Main Block',
    code: {
      python: 'if __name__ == "__main__":'
    },
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'python-print',
    category: 'io',
    label: 'print message',
    code: {
      python: 'print("{text}")'
    },
    inputs: [
      { name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }
    ],
    language: 'python',
    color: 'block-looks'
  },
  {
    id: 'python-input-int',
    category: 'io',
    label: 'read integer',
    code: {
      python: '{var} = int(input())'
    },
    inputs: [
      { name: 'var', placeholder: 'number', defaultValue: 'num' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'python-input-string',
    category: 'io',
    label: 'read string',
    code: {
      python: '{var} = input()'
    },
    inputs: [
      { name: 'var', placeholder: 'text', defaultValue: 'str' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'python-int-declare',
    category: 'variables',
    label: 'create integer',
    code: {
      python: '{name} = {value}'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-string-declare',
    category: 'variables',
    label: 'create string',
    code: {
      python: '{name} = "{value}"'
    },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: {
      python: 'if {condition}:'
    },
    inputs: [
      { name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }
    ],
    language: 'python',
    color: 'block-control'
  },
  {
    id: 'python-else-statement',
    category: 'conditionals',
    label: 'else',
    code: {
      python: 'else:'
    },
    language: 'python',
    color: 'block-control'
  },
  {
    id: 'python-for-loop',
    category: 'loops',
    label: 'for loop',
    code: {
      python: 'for {var} in range({start}, {end}):'
    },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    language: 'python',
    color: 'block-motion'
  },
  {
    id: 'python-while-loop',
    category: 'loops',
    label: 'while loop',
    code: {
      python: 'while {condition}:'
    },
    inputs: [
      { name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }
    ],
    language: 'python',
    color: 'block-motion'
  },
  {
    id: 'python-return-statement',
    category: 'functions',
    label: 'return',
    code: {
      python: 'return {value}'
    },
    inputs: [
      { name: 'value', placeholder: '0', defaultValue: '0' }
    ],
    language: 'python',
    color: 'block-events'
  },
  {
    id: 'python-assign',
    category: 'operators',
    label: 'set variable',
    code: {
      python: '{var} = {value}'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    language: 'python',
    color: 'block-sensing'
  },
  {
    id: 'python-increment',
    category: 'operators',
    label: 'increment',
    code: {
      python: '{var} += 1'
    },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' }
    ],
    language: 'python',
    color: 'block-sensing'
  },

  // Generic Blocks
  {
    id: 'closing-brace',
    category: 'syntax',
    label: 'closing brace }',
    code: {
      c: '}',
      java: '}'
    },
    language: 'c',
    color: 'block-extension'
  },
  {
    id: 'closing-brace-java',
    category: 'syntax',
    label: 'closing brace }',
    code: {
      java: '}'
    },
    language: 'java',
    color: 'block-extension'
  },
  {
    id: 'end-block-python',
    category: 'conditionals',
    label: 'end block',
    code: {
      python: '# end block'
    },
    language: 'python',
    color: 'block-control'
  }
];

// Function to get blocks filtered by language
export const getBlocksByLanguage = (language: string) => {
  return blockTemplates.filter(block => block.language === language);
};