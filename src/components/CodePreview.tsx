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
  onCodeChange: (code: string) => void;
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
    case 3: return 'text-green-600'; // Accepted
    case 4: return 'text-red-600';   // Wrong Answer
    case 5: return 'text-yellow-600'; // Time Limit Exceeded
    case 6: return 'text-red-600';   // Compilation Error
    default: return 'text-gray-600';
  }
};

const getStatusBgColor = (status: number): string => {
  switch (status) {
    case 3: return 'bg-green-100 border-green-200'; // Accepted
    case 4: return 'bg-red-100 border-red-200';   // Wrong Answer
    case 5: return 'bg-yellow-100 border-yellow-200'; // Time Limit Exceeded
    case 6: return 'bg-red-100 border-red-200';   // Compilation Error
    default: return 'bg-gray-100 border-gray-200';
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
  onToggleDarkMode,
  onCodeChange
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
    <div className={cn(
      "w-96 h-full flex flex-col border-l",
      isDarkMode 
        ? "bg-gray-900 border-gray-700 text-white" 
        : "bg-white border-gray-200 text-gray-900"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 border-b",
        isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
      )}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Code Editor
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                isDarkMode 
                  ? "border-gray-600 hover:bg-gray-700" 
                  : "border-gray-300 hover:bg-gray-100"
              )}
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={downloadCode}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                isDarkMode 
                  ? "border-gray-600 hover:bg-gray-700" 
                  : "border-gray-300 hover:bg-gray-100"
              )}
              title="Download code"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <button
          onClick={onExecute}
          disabled={isExecuting || !code.trim()}
          className={cn(
            "w-full px-4 py-3 rounded-lg font-medium transition-all",
            "flex items-center justify-center gap-2",
            isExecuting || !code.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          )}
        >
          <Play className="w-4 h-4" />
          <span>
            {isExecuting ? 'Running...' : 'Run Code'}
          </span>
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 border-b border-gray-200 relative">
        <div className={cn(
          "absolute top-2 right-2 z-20 px-2 py-1 rounded text-xs",
          isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
        )}>
          Editable
        </div>
        <Editor
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          language={getMonacoLanguage(language)}
          theme={isDarkMode ? 'vs-dark' : 'light'}
          options={{
            readOnly: false,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'gutter',
            cursorStyle: 'line',
            wordWrap: 'on',
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
            automaticLayout: true,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            editor.focus();
          }}
        />
      </div>

      {/* Output Panel */}
      <div className={cn(
        "h-64 p-4 overflow-y-auto",
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      )}>
        <h4 className="text-sm font-medium mb-3">
          Output
        </h4>
        
        {!executionResult ? (
          <div className={cn(
            "text-sm italic",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Click "Run Code" to execute your program
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Status:
              </span>
              <span className={cn(
                "px-2 py-1 rounded text-xs font-medium border",
                getStatusColor(executionResult.status.id),
                getStatusBgColor(executionResult.status.id)
              )}>
                {executionResult.status.description}
              </span>
            </div>

            {/* Execution Info */}
            {(executionResult.time || executionResult.memory) && (
              <div className="flex items-center gap-4 text-xs">
                {executionResult.time && (
                  <span className={cn(
                    "px-2 py-1 rounded border",
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-600"
                  )}>
                    Time: {executionResult.time}s
                  </span>
                )}
                {executionResult.memory && (
                  <span className={cn(
                    "px-2 py-1 rounded border",
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-600"
                  )}>
                    Memory: {executionResult.memory} KB
                  </span>
                )}
              </div>
            )}

            {/* Success Output */}
            {executionResult.stdout && (
              <div>
                <div className="text-green-600 font-medium mb-2">
                  Output:
                </div>
                <pre className={cn(
                  "p-3 rounded border text-xs font-mono whitespace-pre-wrap",
                  isDarkMode 
                    ? "bg-gray-900 border-gray-600 text-gray-200" 
                    : "bg-white border-gray-200 text-gray-800"
                )}>
                  {executionResult.stdout}
                </pre>
              </div>
            )}

            {/* Runtime Errors */}
            {executionResult.stderr && (
              <div className="space-y-2">
                <div className="text-red-600 font-medium mb-2">
                  Runtime Error:
                </div>
                <pre className="bg-red-50 border border-red-200 p-3 rounded text-red-800 whitespace-pre-wrap text-xs font-mono">
                  {executionResult.stderr}
                </pre>
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 text-xs">
                    <strong>How to fix:</strong> Runtime errors occur during program execution. Check for array bounds, null pointers, or division by zero.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Compilation Errors */}
            {executionResult.compile_output && (
              <div className="space-y-2">
                <div className="text-red-600 font-medium mb-2">
                  Compilation Error:
                </div>
                <pre className="bg-red-50 border border-red-200 p-3 rounded text-red-800 whitespace-pre-wrap text-xs font-mono">
                  {executionResult.compile_output}
                </pre>
                {(() => {
                  const suggestion = getErrorSuggestion(executionResult.compile_output, language);
                  return suggestion && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800 text-xs">
                        <strong>Suggestion:</strong> {suggestion}
                      </AlertDescription>
                    </Alert>
                  );
                })()}
                <Alert className="border-gray-200 bg-gray-50">
                  <AlertCircle className="h-4 w-4 text-gray-600" />
                  <AlertDescription className="text-gray-700 text-xs">
                    <strong>Quick Tips:</strong>
                    <ul className="mt-1 space-y-1 text-xs list-disc list-inside">
                      <li>Check for missing semicolons (;) and brackets</li>
                      <li>Ensure all variables are declared before use</li>
                      <li>Verify function names and syntax</li>
                      {language === 'c' && <li>Make sure you have #include &lt;stdio.h&gt; for I/O functions</li>}
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* No output case */}
            {!executionResult.stdout && !executionResult.stderr && !executionResult.compile_output && executionResult.status.id === 3 && (
              <div className={cn(
                "text-sm italic",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Program executed successfully with no output
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};