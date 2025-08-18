import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Plus, Sparkles, Code2, Layers, Trash2 } from 'lucide-react';
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
    <div className="flex-1 h-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)
            `
          }}
        />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${12 + Math.random() * 8}px`,
              height: `${12 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(120, 119, 198, 0.3)', 'rgba(255, 119, 198, 0.3)', 'rgba(167, 139, 250, 0.3)'][i % 3]
              } 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 py-6 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-lg shadow-green-400/50" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
              </div>
              <div className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Canvas
                </h2>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Code2 className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-purple-100 tracking-wider">
                {language.toUpperCase()}
              </span>
            </div>
          </div>
          
          {blocks.length > 0 && (
            <button
              onClick={onClearAll}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/30 hover:border-red-400/50 text-red-200 hover:text-red-100 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            >
              <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        ref={drop}
        className={cn(
          "relative z-10 flex-1 p-8 transition-all duration-500 ease-out",
          isOver && "bg-gradient-to-br from-purple-500/5 to-pink-500/5"
        )}
      >
        <div className="max-w-7xl mx-auto h-full">
          {blocks.length === 0 ? (
            // Empty state with ZeroCodes aesthetic
            <div className={cn(
              "h-full flex items-center justify-center relative transition-all duration-500",
              "border-2 border-dashed rounded-3xl min-h-[600px]",
              isOver ? 
                "border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 scale-[1.01] shadow-2xl shadow-purple-500/20" : 
                "border-white/10 hover:border-white/20"
            )}>
              {/* Dynamic glow effect */}
              {isOver && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 rounded-3xl animate-pulse" />
                  <div className="absolute inset-0 border border-purple-400/30 rounded-3xl animate-pulse" />
                </>
              )}
              
              <div className="text-center relative z-10 max-w-2xl px-8">
                <div className="relative mb-12">
                  <div className="relative inline-block">
                    <Plus className={cn(
                      "w-24 h-24 transition-all duration-500 drop-shadow-2xl",
                      isOver ? 
                        "text-purple-400 scale-125 animate-pulse" : 
                        "text-white/30 hover:text-white/50"
                    )} />
                    {isOver && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 border-2 border-purple-400/30 rounded-full animate-ping" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-28 h-28 border border-pink-400/40 rounded-full animate-ping animation-delay-300" />
                        </div>
                      </>
                    )}
                  </div>
                  <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-4 -right-4 animate-bounce drop-shadow-lg" />
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full absolute -bottom-2 -left-2 animate-pulse opacity-60" />
                </div>
                
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  Start Building Your Program
                </h3>
                <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
                  Drag programming blocks from the sidebar to build your {language.toUpperCase()} program visually. 
                  <span className="text-purple-300 font-medium"> No syntax required!</span>
                </p>
                
                {/* Feature highlights */}
                <div className="flex justify-center gap-8 mb-8">
                  {[
                    { icon: '🎯', label: 'Precise' },
                    { icon: '⚡', label: 'Fast' },
                    { icon: '🚀', label: 'Powerful' }
                  ].map(({ icon, label }, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <span className="text-3xl filter drop-shadow-lg">{icon}</span>
                      <span className="text-xs text-white/40 font-medium tracking-wide">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action hint */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm text-purple-200 font-medium">
                    Ready to create something amazing?
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Blocks list with enhanced styling
            <div className="space-y-6">
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
              
              {/* Enhanced drop target */}
              <div className={cn(
                "h-24 border-2 border-dashed rounded-2xl transition-all duration-300 backdrop-blur-sm",
                "flex items-center justify-center text-white/50 text-sm font-medium relative overflow-hidden",
                isOver ? 
                  "border-purple-400/60 bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-200 scale-[1.02] shadow-xl shadow-purple-500/20" : 
                  "border-white/10 hover:border-white/20 hover:bg-white/5"
              )}>
                {/* Background glow for drop state */}
                {isOver && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-pink-400/20 animate-pulse" />
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <Plus className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isOver ? "animate-spin" : ""
                  )} />
                  <span className="font-medium">
                    {isOver ? 'Perfect! Drop your block here' : 'Add more blocks here'}
                  </span>
                  {isOver && <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};