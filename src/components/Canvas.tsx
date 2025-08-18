import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Plus, Sparkles, Code2, Layers } from 'lucide-react';
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
    <div className="flex-1 h-full canvas-modern relative">
      {/* Modern grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 float-subtle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10 glass-effect">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold gradient-text">Canvas</h2>
              </div>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-white/60" />
              <span className="text-sm font-mono text-white/80 px-3 py-1 rounded-lg glass-effect">
                {language.toUpperCase()}
              </span>
            </div>
          </div>
          
          {blocks.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-4 py-2 text-sm bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-200 rounded-lg font-medium transition-all duration-300 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400/50 interactive-scale glass-effect"
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
          "relative z-10 flex-1 p-6 min-h-[calc(100%-90px)] transition-all duration-300",
          isOver && "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
        )}
      >
        {blocks.length === 0 ? (
          // Empty state
          <div className={cn(
            "h-full flex items-center justify-center relative transition-all duration-500",
            "border-2 border-dashed rounded-2xl",
            isOver ? "border-blue-400/60 bg-gradient-to-br from-blue-500/10 to-purple-500/10 scale-[1.02]" : "border-white/20"
          )}>
            {/* Glow effect when hovering */}
            {isOver && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pulse-modern" />
            )}
            
            <div className="text-center text-white relative z-10 max-w-md">
              <div className="relative mb-8">
                <div className="relative">
                  <Plus className={cn(
                    "w-20 h-20 mx-auto transition-all duration-500",
                    isOver ? "text-blue-400 scale-125" : "text-white/40"
                  )} />
                  {isOver && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border-2 border-blue-400/40 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 gradient-text">
                Start Building Your Program
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Drag programming blocks from the sidebar to build your {language.toUpperCase()} program visually. 
                No syntax required!
              </p>
              
              <div className="flex justify-center gap-4 text-2xl">
                {['🎯', '⚡', '🚀'].map((emoji, i) => (
                  <span
                    key={i}
                    className="float-subtle"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Blocks list
          <div className="space-y-4 max-w-5xl">
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
              "h-20 border-2 border-dashed rounded-xl transition-all duration-300",
              "flex items-center justify-center text-white/60 text-sm font-medium glass-effect",
              isOver ? "border-blue-400/60 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 scale-[1.02] pulse-modern" : "border-white/20"
            )}>
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5" />
                <span>{isOver ? 'Perfect! Drop your block here' : 'Add more blocks here'}</span>
                {isOver && <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};