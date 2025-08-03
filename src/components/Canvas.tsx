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
    <div className="flex-1 h-full canvas-glow relative overflow-hidden">
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle, hsl(var(--canvas-grid)) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, hsl(271 91% 65% / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(315 100% 65% / 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '30px 30px, 200px 200px, 200px 200px',
          animation: 'float 6s ease-in-out infinite'
        }}
      />

      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-white/10 glass-effect">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Program Canvas
            </span>
            <span className="text-sm font-mono text-white/60 px-2 py-1 rounded-md glass-effect">
              {language.toUpperCase()}
            </span>
          </h2>
          {blocks.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white 
                       rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25
                       border border-white/20 glass-effect"
            >
              🗑️ Clear All
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
            "h-full flex items-center justify-center relative",
            "border-2 border-dashed border-white/20 rounded-xl",
            "transition-all duration-500",
            isOver && "border-emerald-400 bg-emerald-400/20 scale-105"
          )}>
            {/* Magical glow effect when hovering */}
            {isOver && (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-transparent to-cyan-400/20 rounded-xl animate-pulse" />
            )}
            
            <div className="text-center text-white relative z-10">
              <div className="relative mb-6">
                <Plus className={cn(
                  "w-16 h-16 mx-auto transition-all duration-500",
                  isOver ? "text-emerald-400 scale-125 animate-spin" : "text-white/40"
                )} />
                {isOver && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-2 border-emerald-400 rounded-full animate-ping" />
                  </div>
                )}
              </div>
              <p className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ✨ Drop blocks here to start coding ✨
              </p>
              <p className="text-sm text-white/60 max-w-md">
                Drag programming blocks from the sidebar to build your magical {language.toUpperCase()} program
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {['🎯', '⚡', '🚀'].map((emoji, i) => (
                  <span
                    key={i}
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
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
              "h-16 border-2 border-dashed border-white/20 rounded-xl",
              "flex items-center justify-center text-white/60 text-sm font-medium",
              "transition-all duration-300 glass-effect",
              isOver && "border-emerald-400 bg-emerald-400/20 text-emerald-400 scale-105 pulse-glow"
            )}>
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {isOver ? '🎯 Perfect! Drop it here!' : '+ Drop new blocks here'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};