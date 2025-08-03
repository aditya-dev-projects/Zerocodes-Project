
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
    <div className="w-96 h-full glass-effect border-l border-white/10 flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 animate-pulse" />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse" />
            Code Editor
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg glass-effect hover:bg-white/20 transition-all duration-300 hover:scale-110"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-400" />
              )}
            </button>
            <button
              onClick={downloadCode}
              className="p-2 rounded-lg glass-effect hover:bg-white/20 transition-all duration-300 hover:scale-110"
              title="Download code"
            >
              <Download className="w-4 h-4 text-green-400" />
            </button>
          </div>
        </div>
        
        <button
          onClick={onExecute}
          disabled={isExecuting || !code.trim()}
          className={cn(
            "w-full px-4 py-3 rounded-xl font-bold transition-all duration-300",
            "flex items-center justify-center gap-3 relative overflow-hidden",
            "border border-white/20",
            isExecuting || !code.trim()
              ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105 pulse-glow"
          )}
        >
          {!isExecuting && !code.trim() && <div className="absolute inset-0 shimmer-effect" />}
          <Play className={cn("w-5 h-5", isExecuting && "animate-spin")} />
          <span className="font-extrabold">
            {isExecuting ? 'Executing Magic...' : 'Run Code ⚡'}
          </span>
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 border-b border-white/10 relative">
        <div className="absolute top-2 right-2 z-20 px-2 py-1 rounded-md glass-effect text-xs text-white/60">
          ✏️ Editable
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
            cursorBlinking: 'smooth',
            wordWrap: 'on',
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
            fontLigatures: true,
            smoothScrolling: true,
            contextmenu: true,
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            editor.focus();
          }}
        />
      </div>

      {/* Output Panel */}
      <div className="h-64 p-4 bg-black/30 backdrop-blur-sm overflow-y-auto relative">
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
