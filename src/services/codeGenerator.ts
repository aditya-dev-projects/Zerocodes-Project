import { Language, CodeBlock } from '@/types/blocks';

export const generateCode = (blocks: CodeBlock[], language: Language): string => {
  if (blocks.length === 0) return '';

  const sortedBlocks = [...blocks].sort((a, b) => a.position - b.position);
  let code = '';
  let indentLevel = 0;
  
  // Language-specific setup
  switch (language) {
    case 'c':
      code = generateCCode(sortedBlocks);
      break;
    case 'python':
      code = generatePythonCode(sortedBlocks);
      break;
    case 'java':
      code = generateJavaCode(sortedBlocks);
      break;
  }

  return code;
};

const generateCCode = (blocks: CodeBlock[]): string => {
  let code = '';
  let indentLevel = 0;
  let hasIncludes = false;
  let hasMain = false;
  
  // First pass: add includes at the top
  blocks.forEach(block => {
    if (block.category === 'includes' && block.code.c) {
      code += processTemplate(block.code.c, block.inputs) + '\n';
      hasIncludes = true;
    }
  });
  
  if (hasIncludes) code += '\n';
  
  // Second pass: add other blocks
  blocks.forEach(block => {
    if (block.category === 'includes') return;
    
    const template = block.code.c;
    if (!template) return;
    
    const processedCode = processTemplate(template, block.inputs);
    
    // Handle indentation
    if (processedCode.includes('}') && !processedCode.includes('{')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    const indent = '    '.repeat(indentLevel);
    code += indent + processedCode + '\n';
    
    if (processedCode.includes('{') && !processedCode.includes('}')) {
      indentLevel++;
    }
    
    if (block.id === 'main-function') {
      hasMain = true;
    }
  });
  
  // Auto-add main function if not present
  if (!hasMain && blocks.some(b => b.category !== 'includes')) {
    code = code.trimEnd() + '\n}\n';
  }
  
  return code.trim();
};

const generatePythonCode = (blocks: CodeBlock[]): string => {
  let code = '';
  let indentLevel = 0;
  let hasMain = false;
  
  // First pass: add imports
  blocks.forEach(block => {
    if (block.category === 'includes' && block.code.python && !block.code.python.includes('# No imports')) {
      code += processTemplate(block.code.python, block.inputs) + '\n';
    }
  });
  
  if (code.trim()) code += '\n';
  
  // Second pass: add other blocks
  blocks.forEach(block => {
    if (block.category === 'includes') return;
    
    const template = block.code.python;
    if (!template) return;
    
    const processedCode = processTemplate(template, block.inputs);
    
    // Handle indentation for Python
    if (processedCode.includes('# end block')) {
      indentLevel = Math.max(0, indentLevel - 1);
      return; // Skip the end block comment
    }
    
    const indent = '    '.repeat(indentLevel);
    code += indent + processedCode + '\n';
    
    if (processedCode.endsWith(':')) {
      indentLevel++;
    }
    
    if (block.id === 'main-function') {
      hasMain = true;
    }
  });
  
  // Auto-add main call if main function exists
  if (hasMain) {
    code += '\nif __name__ == "__main__":\n    main()\n';
  }
  
  return code.trim();
};

const generateJavaCode = (blocks: CodeBlock[]): string => {
  let code = '';
  let indentLevel = 0;
  let hasMain = false;
  let hasImports = false;
  
  // First pass: add imports
  blocks.forEach(block => {
    if (block.category === 'includes' && block.code.java) {
      code += processTemplate(block.code.java, block.inputs) + '\n';
      hasImports = true;
    }
  });
  
  if (hasImports) code += '\n';
  
  // Add class declaration
  code += 'public class Main {\n';
  indentLevel = 1;
  
  // Second pass: add other blocks
  blocks.forEach(block => {
    if (block.category === 'includes') return;
    
    const template = block.code.java;
    if (!template) return;
    
    const processedCode = processTemplate(template, block.inputs);
    
    // Handle indentation
    if (processedCode.includes('}') && !processedCode.includes('{')) {
      indentLevel = Math.max(1, indentLevel - 1);
    }
    
    const indent = '    '.repeat(indentLevel);
    
    // Special handling for main method - add Scanner if needed
    if (block.id === 'main-function') {
      code += indent + processedCode + '\n';
      if (blocks.some(b => b.id === 'scanf-int' || b.id === 'scanf-string')) {
        code += indent + '    Scanner scanner = new Scanner(System.in);\n';
      }
      hasMain = true;
    } else {
      code += indent + processedCode + '\n';
    }
    
    if (processedCode.includes('{') && !processedCode.includes('}')) {
      indentLevel++;
    }
  });
  
  // Close main method and class
  if (hasMain) {
    code += '    }\n';
  }
  code += '}\n';
  
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