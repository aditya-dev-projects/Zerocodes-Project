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

  return (
    <div
      ref={drag}
      className={cn(
        "px-3 py-2 rounded-lg cursor-move select-none text-sm font-medium transition-all duration-200",
        "border border-block-border shadow-sm hover:shadow-md",
        "text-block-text relative overflow-hidden",
        isDragging && "opacity-50",
        `bg-${block.color}`
      )}
      style={{
        backgroundColor: `hsl(var(--${block.color}))`,
      }}
    >
      <div className="relative z-10">
        {block.label}
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-block-hover opacity-0 hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
};