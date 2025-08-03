
import { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Download, Moon, Sun, AlertCircle, Lightbulb } from 'lucide-react';
import { Language, ExecutionResult } from '@/types/blocks';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CodePreviewProps {
  code: string;
  language: Language;
  isExecuting: boolean;
  executionResult: ExecutionResult | null;
  isDarkMode: boolean;
  onExecute: () => void;
  onToggleDarkMode: () => void;
}

const getMonacoLanguage = (lang: Language): string => {
  switch (lang) {
    case 'c': return 'c';
    case 'python': return 'python';
    case 'java': return 'java';
    default: return 'plaintext';
  }
};

const getStatusColor = (status: number): string => {
  switch (status) {
    case 3: return 'text-green-400'; // Accepted
    case 4: return 'text-red-400';   // Wrong Answer
    case 5: return 'text-yellow-400'; // Time Limit Exceeded
    case 6: return 'text-red-400';   // Compilation Error
    default: return 'text-gray-400';
  }
};

const getErrorSuggestion = (error: string, language: Language): string | null => {
  const lowerError = error.toLowerCase();
  
  if (language === 'c') {
    if (lowerError.includes('expected declaration specifiers')) {
      return "Make sure you have a proper main function structure: int main() { ... }";
    }
    if (lowerError.includes('expected identifier') || lowerError.includes('expected declaration')) {
      return "Check your function declarations and variable definitions. Make sure all statements are inside functions.";
    }
    if (lowerError.includes('undeclared') || lowerError.includes('not declared')) {
      return "Variable or function not declared. Make sure to declare variables before using them.";
    }
    if (lowerError.includes('missing terminating')) {
      return "Check for missing quotes (\") or semicolons (;) at the end of statements.";
    }
    if (lowerError.includes('include')) {
      return "Make sure to include necessary header files like #include <stdio.h> for printf/scanf.";
    }
  }
  
  if (language === 'python') {
    if (lowerError.includes('indentation')) {
      return "Python uses indentation to define code blocks. Make sure your indentation is consistent.";
    }
    if (lowerError.includes('syntax error')) {
      return "Check for missing colons (:) after if/for/while statements, or incorrect parentheses.";
    }
    if (lowerError.includes('not defined')) {
      return "Variable not defined. Make sure to define variables before using them.";
    }
  }
  
  if (language === 'java') {
    if (lowerError.includes('class') && lowerError.includes('public')) {
      return "Make sure your class name matches the filename and has proper structure.";
    }
    if (lowerError.includes('main')) {
      return "Java requires: public static void main(String[] args) { ... }";
    }
    if (lowerError.includes('cannot find symbol')) {
      return "Variable or method not found. Check spelling and make sure it's declared.";
    }
  }
  
  return null;
};

export const CodePreview = ({
  code,
  language,
  isExecuting,
  executionResult,
  isDarkMode,
  onExecute,
  onToggleDarkMode
}: CodePreviewProps) => {
  const editorRef = useRef(null);

  const downloadCode = () => {
    const extensions = { c: 'c', python: 'py', java: 'java' };
    const filename = `program.${extensions[language]}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-96 h-full bg-zerocodes-panel border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Code Preview</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={downloadCode}
              className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
              title="Download code"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <button
          onClick={onExecute}
          disabled={isExecuting || !code.trim()}
          className={cn(
            "w-full px-4 py-2 rounded-md font-medium transition-all duration-200",
            "flex items-center justify-center gap-2",
            isExecuting || !code.trim()
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
          )}
        >
          <Play className="w-4 h-4" />
          {isExecuting ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 border-b border-border">
        <Editor
          value={code}
          language={getMonacoLanguage(language)}
          theme={isDarkMode ? 'vs-dark' : 'light'}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'none',
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>

      {/* Output Panel */}
      <div className="h-64 p-4 bg-muted/20 overflow-y-auto">
        <h4 className="text-sm font-medium text-foreground mb-2">Output</h4>
        
        {!executionResult ? (
          <div className="text-sm text-muted-foreground italic">
            Click "Run Code" to execute your program
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <span className={cn("font-medium", getStatusColor(executionResult.status.id))}>
                {executionResult.status.description}
              </span>
            </div>

            {/* Execution Info */}
            {(executionResult.time || executionResult.memory) && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {executionResult.time && (
                  <span>Time: {executionResult.time}s</span>
                )}
                {executionResult.memory && (
                  <span>Memory: {executionResult.memory} KB</span>
                )}
              </div>
            )}

            {/* Success Output */}
            {executionResult.stdout && (
              <div>
                <div className="text-green-400 font-medium mb-1">Output:</div>
                <pre className="bg-background p-2 rounded border text-foreground whitespace-pre-wrap text-xs font-mono">
                  {executionResult.stdout}
                </pre>
              </div>
            )}

            {/* Runtime Errors */}
            {executionResult.stderr && (
              <div className="space-y-2">
                <div className="text-red-400 font-medium mb-1">Runtime Error:</div>
                <pre className="bg-red-950/20 p-2 rounded border border-red-500/20 text-red-400 whitespace-pre-wrap text-xs font-mono">
                  {executionResult.stderr}
                </pre>
                <Alert className="border-yellow-500/20 bg-yellow-950/20">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  <AlertDescription className="text-yellow-200 text-xs">
                    <strong>How to fix:</strong> Runtime errors occur during program execution. Check for array bounds, null pointers, or division by zero.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Compilation Errors */}
            {executionResult.compile_output && (
              <div className="space-y-2">
                <div className="text-red-400 font-medium mb-1">Compilation Error:</div>
                <pre className="bg-red-950/20 p-2 rounded border border-red-500/20 text-red-400 whitespace-pre-wrap text-xs font-mono">
                  {executionResult.compile_output}
                </pre>
                {(() => {
                  const suggestion = getErrorSuggestion(executionResult.compile_output, language);
                  return suggestion && (
                    <Alert className="border-blue-500/20 bg-blue-950/20">
                      <Lightbulb className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-200 text-xs">
                        <strong>Suggestion:</strong> {suggestion}
                      </AlertDescription>
                    </Alert>
                  );
                })()}
                <Alert className="border-yellow-500/20 bg-yellow-950/20">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <AlertDescription className="text-yellow-200 text-xs">
                    <strong>Quick Tips:</strong>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• Check for missing semicolons (;) and brackets</li>
                      <li>• Ensure all variables are declared before use</li>
                      <li>• Verify function names and syntax</li>
                      {language === 'c' && <li>• Make sure you have #include &lt;stdio.h&gt; for I/O functions</li>}
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* No output case */}
            {!executionResult.stdout && !executionResult.stderr && !executionResult.compile_output && executionResult.status.id === 3 && (
              <div className="text-muted-foreground text-sm italic">
                Program executed successfully with no output
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
