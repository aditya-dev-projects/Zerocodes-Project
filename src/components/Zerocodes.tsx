import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { CodePreview } from './CodePreview';
import { Language, CodeBlock, BlockTemplate, ExecutionResult } from '@/types/blocks';
import { generateCode } from '@/services/codeGenerator';
import { Judge0Service } from '@/services/judge0Service';

export const Zerocodes = () => {
  const [language, setLanguage] = useState<Language>('c');
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const { user, isGuest, setGuestMode } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle guest mode from URL
  useEffect(() => {
    const guestParam = searchParams.get('guest');
    if (guestParam === 'true') {
      setGuestMode(true);
    }
  }, [searchParams, setGuestMode]);

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
    setManualCode(code);
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

  const handleCodeChange = useCallback((code: string) => {
    setManualCode(code);
  }, []);

  const handleExecuteCode = async () => {
    // Check if user is authenticated or guest
    if (!user && !isGuest) {
      toast.error('Please sign in to run code');
      navigate('/auth');
      return;
    }
    
    // Prevent guests from running code
    if (isGuest) {
      toast.error('Please sign in to run code. Guests have limited access.');
      navigate('/auth');
      return;
    }

    const codeToExecute = manualCode.trim() || generatedCode.trim();
    if (!codeToExecute) {
      toast.error('No code to execute');
      return;
    }

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const service = new Judge0Service();
      const result = await service.executeCode(codeToExecute, language);
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
      
      // Show specific error message if available
      if (error instanceof Error) {
        if (error.message.includes('HTTP error! status: 400')) {
          toast.error('Code compilation failed - please check your syntax');
        } else if (error.message.includes('HTTP error! status: 401')) {
          toast.error('API key authentication failed');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to execute code');
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-full flex bg-slate-900">
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
          code={manualCode || generatedCode}
          language={language}
          isExecuting={isExecuting}
          executionResult={executionResult}
          isDarkMode={isDarkMode}
          onExecute={handleExecuteCode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onCodeChange={handleCodeChange}
        />
      </div>
    </DndProvider>
  );
};