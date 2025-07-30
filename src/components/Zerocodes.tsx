import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';

import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { CodePreview } from './CodePreview';
import { Language, CodeBlock, BlockTemplate, ExecutionResult } from '@/types/blocks';
import { getBlockById } from '@/data/blockTemplates';
import { generateCode } from '@/services/codeGenerator';
import { Judge0Service, DemoExecutionService } from '@/services/judge0Service';

export const Zerocodes = () => {
  const [language, setLanguage] = useState<Language>('c');
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);

  // Global function for inline input editing
  useEffect(() => {
    window.updateBlockInput = (blockId: string, key: string, value: string) => {
      setBlocks(prev => prev.map(block => 
        block.id === blockId 
          ? { ...block, inputs: { ...block.inputs, [key]: value } }
          : block
      ));
    };

    return () => {
      delete window.updateBlockInput;
    };
  }, []);

  // Update generated code when blocks or language changes
  useEffect(() => {
    const code = generateCode(blocks, language);
    setGeneratedCode(code);
  }, [blocks, language]);

  const handleAddBlock = useCallback((template: BlockTemplate) => {
    const newBlock: CodeBlock = {
      ...template,
      id: `${template.id}-${Date.now()}`,
      inputs: template.inputs?.reduce((acc, input) => ({
        ...acc,
        [input.name]: input.defaultValue || ''
      }), {}) || {},
      position: blocks.length
    };

    setBlocks(prev => [...prev, newBlock]);
    toast.success(`Added ${template.label} block`);
  }, [blocks.length]);

  const handleUpdateBlock = useCallback((id: string, inputs: Record<string, string>) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, inputs } : block
    ));
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const filtered = prev.filter(block => block.id !== id);
      // Reorder positions
      return filtered.map((block, index) => ({ ...block, position: index }));
    });
    toast.success('Block removed');
  }, []);

  const handleMoveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      const draggedBlock = newBlocks[dragIndex];
      
      newBlocks.splice(dragIndex, 1);
      newBlocks.splice(hoverIndex, 0, draggedBlock);
      
      // Update positions
      return newBlocks.map((block, index) => ({ ...block, position: index }));
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setBlocks([]);
    setExecutionResult(null);
    toast.success('Canvas cleared');
  }, []);

  const handleExecuteCode = async () => {
    if (!generatedCode.trim()) {
      toast.error('No code to execute');
      return;
    }

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      let service;
      
      if (apiKey) {
        service = new Judge0Service(apiKey);
      } else {
        // Show API key dialog for real execution
        setShowApiKeyDialog(true);
        setIsExecuting(false);
        return;
      }

      const result = await service.executeCode(generatedCode, language);
      setExecutionResult(result);
      
      if (result.status.id === 3) {
        toast.success('Code executed successfully');
      } else if (result.status.id === 6) {
        toast.error('Compilation error');
      } else {
        toast.error('Execution failed');
      }
    } catch (error) {
      console.error('Execution error:', error);
      
      // Fallback to demo service
      try {
        const demoService = new DemoExecutionService();
        const result = await demoService.executeCode(generatedCode, language);
        setExecutionResult(result);
        toast.info('Running in demo mode - Add your RapidAPI key for real execution');
      } catch (demoError) {
        toast.error('Failed to execute code');
        console.error('Demo execution error:', demoError);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-full flex bg-background">
        <Sidebar 
          language={language} 
          onLanguageChange={setLanguage}
        />
        
        <Canvas
          blocks={blocks}
          language={language}
          onAddBlock={handleAddBlock}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={handleDeleteBlock}
          onMoveBlock={handleMoveBlock}
          onClearAll={handleClearAll}
        />
        
        <CodePreview
          code={generatedCode}
          language={language}
          isExecuting={isExecuting}
          executionResult={executionResult}
          isDarkMode={isDarkMode}
          onExecute={handleExecuteCode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        {/* API Key Dialog */}
        {showApiKeyDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-border rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">RapidAPI Key Required</h3>
              <p className="text-sm text-muted-foreground mb-4">
                To execute code with Judge0, you need a RapidAPI key. Get one at{' '}
                <a 
                  href="https://rapidapi.com/judge0-official/api/judge0-ce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  RapidAPI Judge0
                </a>
              </p>
              <input
                type="password"
                placeholder="Enter your RapidAPI key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background mb-4"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowApiKeyDialog(false);
                    // Try demo mode
                    handleExecuteCode();
                  }}
                  className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted"
                >
                  Use Demo Mode
                </button>
                <button
                  onClick={() => {
                    setShowApiKeyDialog(false);
                    if (apiKey) {
                      handleExecuteCode();
                    }
                  }}
                  disabled={!apiKey}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Execute
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};