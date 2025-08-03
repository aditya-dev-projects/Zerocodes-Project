export type Language = 'c' | 'python' | 'java';

export type BlockCategory = 
  | 'includes' 
  | 'io' 
  | 'variables' 
  | 'conditionals' 
  | 'loops' 
  | 'functions' 
  | 'operators'
  | 'syntax';

export interface BlockTemplate {
  id: string;
  category: BlockCategory;
  label: string;
  code: {
    c?: string;
    python?: string;
    java?: string;
  };
  inputs?: {
    name: string;
    placeholder: string;
    defaultValue?: string;
  }[];
  color: string;
}

export interface BlockInstance {
  id: string;
  templateId: string;
  inputs: Record<string, string>;
  position: number;
}

export interface CodeBlock extends Omit<BlockTemplate, 'inputs'> {
  inputs: Record<string, string>;
  position: number;
}

export const JUDGE0_LANGUAGE_IDS = {
  c: 50,
  python: 71,
  java: 62
} as const;

export interface ExecutionResult {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  status: {
    id: number;
    description: string;
  };
  time?: string;
  memory?: number;
}