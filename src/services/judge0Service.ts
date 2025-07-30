import { Language, JUDGE0_LANGUAGE_IDS, ExecutionResult } from '@/types/blocks';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.VITE_RAPIDAPI_KEY || '';

export class Judge0Service {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || RAPIDAPI_KEY;
  }

  async executeCode(code: string, language: Language, input?: string): Promise<ExecutionResult> {
    if (!this.apiKey) {
      throw new Error('RapidAPI key is required for code execution');
    }

    try {
      // Create submission
      const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: JUDGE0_LANGUAGE_IDS[language],
          source_code: code,
          stdin: input || '',
          expected_output: null
        })
      });

      if (!submissionResponse.ok) {
        throw new Error(`HTTP error! status: ${submissionResponse.status}`);
      }

      const result = await submissionResponse.json();
      
      return {
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output,
        status: result.status,
        time: result.time,
        memory: result.memory
      };
    } catch (error) {
      console.error('Error executing code:', error);
      throw new Error('Failed to execute code. Please check your internet connection and try again.');
    }
  }
}

// Fallback service for demo purposes when no API key is available
export class DemoExecutionService {
  async executeCode(code: string, language: Language): Promise<ExecutionResult> {
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo responses based on code content
    if (code.includes('printf') || code.includes('print') || code.includes('System.out')) {
      const output = this.extractOutput(code, language);
      return {
        stdout: output,
        status: { id: 3, description: 'Accepted' },
        time: '0.001',
        memory: 256
      };
    }

    if (code.includes('scanf') || code.includes('input') || code.includes('Scanner')) {
      return {
        stdout: 'Program executed successfully\n(Note: This is a demo - input operations simulated)',
        status: { id: 3, description: 'Accepted' },
        time: '0.002',
        memory: 512
      };
    }

    return {
      stdout: 'Program executed successfully',
      status: { id: 3, description: 'Accepted' },
      time: '0.001',
      memory: 256
    };
  }

  private extractOutput(code: string, language: Language): string {
    const lines = code.split('\n');
    let output = '';

    for (const line of lines) {
      if (language === 'c' && line.includes('printf(')) {
        const match = line.match(/printf\s*\(\s*"([^"]*)".*\)/);
        if (match) {
          output += match[1].replace(/\\n/g, '\n') + '\n';
        }
      } else if (language === 'python' && line.includes('print(')) {
        const match = line.match(/print\s*\(\s*"([^"]*)"\s*\)/);
        if (match) {
          output += match[1] + '\n';
        }
      } else if (language === 'java' && line.includes('System.out.println(')) {
        const match = line.match(/System\.out\.println\s*\(\s*"([^"]*)"\s*\)/);
        if (match) {
          output += match[1] + '\n';
        }
      }
    }

    return output || 'Hello World\n';
  }
}