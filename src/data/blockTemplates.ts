import { BlockTemplate } from '@/types/blocks';

export const blockTemplates: BlockTemplate[] = [
  // C Blocks
  {
    id: 'c-include-stdio',
    category: 'includes',
    label: '#include <stdio.h>',
    code: '#include <stdio.h>',
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-include-stdlib',
    category: 'includes',
    label: '#include <stdlib.h>',
    code: '#include <stdlib.h>',
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-main-function',
    category: 'functions',
    label: 'main function',
    code: 'int main() {',
    language: 'c',
    color: 'block-events'
  },
  {
    id: 'c-printf',
    category: 'io',
    label: 'print message',
    code: 'printf("{text}\n");',
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
    code: 'scanf("%d", &{var});',
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
    code: 'scanf("%s", {var});',
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
    code: 'int {name} = {value};',
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
    code: 'char {name}[100] = "{value}";',
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
    code: 'if ({condition}) {',
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
    code: '} else {',
    language: 'c',
    color: 'block-control'
  },
  {
    id: 'c-for-loop',
    category: 'loops',
    label: 'for loop',
    code: 'for (int {var} = {start}; {var} < {end}; {var}++) {',
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
    code: 'while ({condition}) {',
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
    code: 'return {value};',
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
    code: '{var} = {value};',
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
    code: '{var}++;',
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
    code: 'import java.util.Scanner;',
    language: 'java',
    color: 'block-variables'
  },
  {
    id: 'java-class-declaration',
    category: 'includes',
    label: 'Java Class Declaration',
    code: 'public class Main {',
    language: 'java',
    color: 'block-variables'
  },
  {
    id: 'java-main-method',
    category: 'functions',
    label: 'Java Main Method',
    code: 'public static void main(String[] args) {',
    language: 'java',
    color: 'block-events'
  },
  {
    id: 'java-scanner',
    category: 'io',
    label: 'Java Scanner',
    code: 'Scanner scanner = new Scanner(System.in);',
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-println',
    category: 'io',
    label: 'print message',
    code: 'System.out.println("{text}");',
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
    code: '{var} = scanner.nextInt();',
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
    code: '{var} = scanner.next();',
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
    code: 'int {name} = {value};',
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
    code: 'String {name} = "{value}";',
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
    code: 'if ({condition}) {',
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
    code: '} else {',
    language: 'java',
    color: 'block-control'
  },
  {
    id: 'java-for-loop',
    category: 'loops',
    label: 'for loop',
    code: 'for (int {var} = {start}; {var} < {end}; {var}++) {',
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
    code: 'while ({condition}) {',
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
    code: 'return {value};',
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
    code: '{var} = {value};',
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
    code: '{var}++;',
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
    code: 'if __name__ == "__main__":',
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'python-print',
    category: 'io',
    label: 'print message',
    code: 'print("{text}")',
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
    code: '{var} = int(input())',
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
    code: '{var} = input()',
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
    code: '{name} = {value}',
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
    code: '{name} = "{value}"',
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
    code: 'if {condition}:',
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
    code: 'else:',
    language: 'python',
    color: 'block-control'
  },
  {
    id: 'python-for-loop',
    category: 'loops',
    label: 'for loop',
    code: 'for {var} in range({start}, {end}):',
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
    code: 'while {condition}:',
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
    code: 'return {value}',
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
    code: '{var} = {value}',
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
    code: '{var} += 1',
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
    code: '}',
    language: 'c', // Also used by Java
    color: 'block-extension'
  },
  {
    id: 'closing-brace-java',
    category: 'syntax',
    label: 'closing brace }',
    code: '}',
    language: 'java',
    color: 'block-extension'
  },
  {
    id: 'end-block-python',
    category: 'conditionals',
    label: 'end block',
    code: '# end block',
    language: 'python',
    color: 'block-control'
  },
  {
    id: 'custom-code',
    category: 'syntax',
    label: 'custom code',
    code: '{code}',
    inputs: [
      { name: 'code', placeholder: 'Write your code here...', defaultValue: '' }
    ],
    language: 'c',
    color: 'block-extension'
  },
  {
    id: 'custom-code-java',
    category: 'syntax',
    label: 'custom code',
    code: '{code}',
    inputs: [
      { name: 'code', placeholder: 'Write your code here...', defaultValue: '' }
    ],
    language: 'java',
    color: 'block-extension'
  },
  {
    id: 'custom-code-python',
    category: 'syntax',
    label: 'custom code',
    code: '{code}',
    inputs: [
      { name: 'code', placeholder: 'Write your code here...', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-extension'
  }
];

export const getBlocksByCategory = (category: string, language: 'c' | 'java' | 'python') => 
  blockTemplates.filter(block => block.category === category && block.language === language);

export const getBlockById = (id: string) => 
  blockTemplates.find(block => block.id === id);
