import { useDrag } from 'react-dnd';
import { BlockTemplate } from '@/types/blocks';
import { cn } from '@/lib/utils';

interface DraggableBlockProps {
  block: BlockTemplate;
}

export const DraggableBlock = ({ block }: DraggableBlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { block },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const blockColors = {
    'block-motion': { bg: 'var(--block-motion)', glow: 'var(--block-motion-glow)' },
    'block-looks': { bg: 'var(--block-looks)', glow: 'var(--block-looks-glow)' },
    'block-sound': { bg: 'var(--block-sound)', glow: 'var(--block-sound-glow)' },
    'block-events': { bg: 'var(--block-events)', glow: 'var(--block-events-glow)' },
    'block-control': { bg: 'var(--block-control)', glow: 'var(--block-control-glow)' },
    'block-sensing': { bg: 'var(--block-sensing)', glow: 'var(--block-sensing-glow)' },
    'block-operators': { bg: 'var(--block-operators)', glow: 'var(--block-operators-glow)' },
    'block-variables': { bg: 'var(--block-variables)', glow: 'var(--block-variables-glow)' },
    'block-extension': { bg: 'var(--block-extension)', glow: 'var(--block-extension-glow)' }
  };

  const colorScheme = blockColors[block.color as keyof typeof blockColors] || blockColors['block-motion'];

  return (
    <div
      ref={drag}
      className={cn(
        "px-4 py-3 rounded-xl cursor-move select-none text-sm font-bold transition-all duration-300",
        "border border-white/20 shadow-lg hover:shadow-2xl relative overflow-hidden",
        "text-white block-hover-effect neon-border",
        isDragging && "opacity-50 scale-95",
        !isDragging && "hover:scale-105"
      )}
      style={{
        '--bg-color': `hsl(${colorScheme.bg})`,
        '--bg-glow': `hsl(${colorScheme.glow})`,
        '--glow-color': `hsl(${colorScheme.glow} / 0.3)`,
        background: `linear-gradient(135deg, hsl(${colorScheme.bg}), hsl(${colorScheme.glow}))`,
        boxShadow: `var(--shadow-medium), 0 0 20px hsl(${colorScheme.glow} / 0.4)`,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      } as React.CSSProperties}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect opacity-0 hover:opacity-100" />
      
      {/* Block content */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
        <span className="font-extrabold tracking-wide">{block.label}</span>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-ping" />
      <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-500" />
    </div>
  );
};