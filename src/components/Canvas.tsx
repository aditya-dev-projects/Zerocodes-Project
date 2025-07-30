import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Plus } from 'lucide-react';
import { CodeBlock as CodeBlockComponent } from './CodeBlock';
import { CodeBlock, Language, BlockTemplate } from '@/types/blocks';
import { cn } from '@/lib/utils';

interface CanvasProps {
  blocks: CodeBlock[];
  language: Language;
  onAddBlock: (block: BlockTemplate) => void;
  onUpdateBlock: (id: string, inputs: Record<string, string>) => void;
  onDeleteBlock: (id: string) => void;
  onMoveBlock: (dragIndex: number, hoverIndex: number) => void;
  onClearAll: () => void;
}

export const Canvas = ({
  blocks,
  language,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
  onClearAll
}: CanvasProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item: { block: BlockTemplate }) => {
      onAddBlock(item.block);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    onMoveBlock(dragIndex, hoverIndex);
  }, [onMoveBlock]);

  return (
    <div className="flex-1 h-full bg-canvas-bg relative overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle, hsl(var(--canvas-grid)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-canvas-grid bg-canvas-bg/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Program Canvas ({language.toUpperCase()})
          </h2>
          {blocks.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white 
                       rounded-md transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={drop}
        className={cn(
          "relative z-10 flex-1 p-6 min-h-[calc(100%-80px)]",
          isOver && "bg-canvas-drop/20",
          "transition-colors duration-200"
        )}
      >
        {blocks.length === 0 ? (
          // Empty state
          <div className={cn(
            "h-full flex items-center justify-center",
            "border-2 border-dashed border-canvas-grid rounded-lg",
            isOver && "border-green-400 bg-green-400/10"
          )}>
            <div className="text-center text-gray-400">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Drop blocks here to start coding</p>
              <p className="text-sm mt-2 opacity-75">
                Drag programming blocks from the sidebar to build your {language.toUpperCase()} program
              </p>
            </div>
          </div>
        ) : (
          // Blocks list
          <div className="space-y-3 max-w-4xl">
            {blocks.map((block, index) => (
              <CodeBlockComponent
                key={block.id}
                block={block}
                language={language}
                onUpdate={onUpdateBlock}
                onDelete={onDeleteBlock}
                onMove={moveBlock}
                index={index}
              />
            ))}
            
            {/* Drop target at the end */}
            <div className={cn(
              "h-16 border-2 border-dashed border-canvas-grid rounded-lg",
              "flex items-center justify-center text-gray-500 text-sm",
              isOver && "border-green-400 bg-green-400/10"
            )}>
              Drop new blocks here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};