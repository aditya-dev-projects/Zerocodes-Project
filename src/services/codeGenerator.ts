import { Language, CodeBlock } from '@/types/blocks';

export const generateCode = (blocks: CodeBlock[], language: Language): string => {
  if (blocks.length === 0) return '';

  const sortedBlocks = [...blocks].sort((a, b) => a.position - b.position);
  let code = '';
  let indentLevel = 0;

  sortedBlocks.forEach(block => {
    if (block.language !== language) return;

    const codeForLanguage = block.code[language];
    if (!codeForLanguage) return;
    
    const processedCode = processTemplate(codeForLanguage, block.inputs);

    if (processedCode.includes('}') && !processedCode.includes('{')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const indent = '    '.repeat(indentLevel);
    code += indent + processedCode + '\n';

    if (processedCode.includes('{') && !processedCode.includes('}')) {
      indentLevel++;
    }
    
    if (language === 'python' && processedCode.endsWith(':')) {
        indentLevel++;
    }
  });

  return code.trim();
};

const processTemplate = (template: string, inputs: Record<string, string>): string => {
  let result = template;

  Object.entries(inputs).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder.replace('{', '\\{').replace('}', '\\}'), 'g'), value);
  });

  return result;
};
