import { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Download, Moon, Sun } from 'lucide-react';
import { Language, ExecutionResult } from '@/types/blocks';
import { cn } from '@/lib/utils';

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
      <div className="h-64 p-4 bg-muted/20">
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

            {/* Output */}
            {executionResult.stdout && (
              <div>
                <div className="text-green-400 font-medium mb-1">Output:</div>
                <pre className="bg-background p-2 rounded border text-foreground whitespace-pre-wrap text-xs font-mono">
                  {executionResult.stdout}
                </pre>
              </div>
            )}

            {/* Errors */}
            {executionResult.stderr && (
              <div>
                <div className="text-red-400 font-medium mb-1">Runtime Error:</div>
                <pre className="bg-red-950/20 p-2 rounded border border-red-500/20 text-red-400 whitespace-pre-wrap text-xs font-mono">
                  {executionResult.stderr}
                </pre>
              </div>
            )}

            {/* Compilation Errors */}
            {executionResult.compile_output && (
              <div>
                <div className="text-yellow-400 font-medium mb-1">Compilation Error:</div>
                <pre className="bg-yellow-950/20 p-2 rounded border border-yellow-500/20 text-yellow-400 whitespace-pre-wrap text-xs font-mono">
                  {executionResult.compile_output}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};