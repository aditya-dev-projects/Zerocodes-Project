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
    'block-motion': { 
      primary: '#3B82F6', 
      secondary: '#1E40AF', 
      accent: '#60A5FA',
      light: '#1E3A8A'
    },
    'block-looks': { 
      primary: '#8B5CF6', 
      secondary: '#7C3AED', 
      accent: '#A78BFA',
      light: '#6D28D9'
    },
    'block-sound': { 
      primary: '#EC4899', 
      secondary: '#DB2777', 
      accent: '#F472B6',
      light: '#BE185D'
    },
    'block-events': { 
      primary: '#F59E0B', 
      secondary: '#D97706', 
      accent: '#FBBF24',
      light: '#B45309'
    },
    'block-control': { 
      primary: '#EF4444', 
      secondary: '#DC2626', 
      accent: '#F87171',
      light: '#B91C1C'
    },
    'block-sensing': { 
      primary: '#10B981', 
      secondary: '#059669', 
      accent: '#34D399',
      light: '#047857'
    },
    'block-operators': { 
      primary: '#6366F1', 
      secondary: '#4F46E5', 
      accent: '#818CF8',
      light: '#4338CA'
    },
    'block-variables': { 
      primary: '#F97316', 
      secondary: '#EA580C', 
      accent: '#FB923C',
      light: '#C2410C'
    },
    'block-extension': { 
      primary: '#06B6D4', 
      secondary: '#0891B2', 
      accent: '#22D3EE',
      light: '#0E7490'
    }
  };

  const colorScheme = blockColors[block.color as keyof typeof blockColors] || blockColors['block-motion'];

  return (
    <div
      ref={drag}
      className={cn(
        "group relative cursor-grab active:cursor-grabbing",
        "select-none transition-all duration-300 ease-out",
        "backdrop-blur-sm",
        isDragging && "opacity-70 scale-105 z-50 rotate-1",
        !isDragging && "hover:scale-[1.02] hover:-translate-y-0.5"
      )}
    >
      {/* Main block container */}
      <div
        className={cn(
          "relative px-4 py-3 rounded-xl",
          "border border-white/10",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-300"
        )}
        style={{
          background: `linear-gradient(135deg, ${colorScheme.primary}E6 0%, ${colorScheme.secondary}F0 100%)`,
          boxShadow: `
            0 4px 20px -4px ${colorScheme.primary}40,
            0 2px 8px -2px ${colorScheme.secondary}30,
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.1)
          `,
        }}
      >
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.accent}15, transparent 60%)`,
            filter: 'blur(0.5px)'
          }}
        />
        
        {/* Inner highlight */}
        <div 
          className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)`
          }}
        />
        
        {/* Block content */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Status indicator dot */}
          <div 
            className="w-2 h-2 rounded-full flex-shrink-0 shadow-sm"
            style={{
              background: `radial-gradient(circle, ${colorScheme.accent} 0%, ${colorScheme.light} 100%)`,
              boxShadow: `
                0 0 4px ${colorScheme.accent}80,
                inset 0 0.5px 0 rgba(255,255,255,0.4),
                inset 0 -0.5px 0 rgba(0,0,0,0.2)
              `
            }}
          />
          
          {/* Block label */}
          <span 
            className="text-white font-semibold text-sm tracking-tight leading-tight"
            style={{
              textShadow: `0 1px 2px rgba(0,0,0,0.3), 0 0 8px ${colorScheme.primary}20`
            }}
          >
            {block.label}
          </span>
        </div>
        
        {/* Drag grip indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-40 transition-all duration-200">
          <div className="flex flex-col gap-0.5">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="w-0.5 h-0.5 bg-white rounded-full shadow-sm"
                style={{
                  boxShadow: `0 0 2px rgba(0,0,0,0.3)`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Active drag state overlay */}
        {isDragging && (
          <>
            <div 
              className="absolute inset-0 rounded-xl animate-pulse"
              style={{
                background: `${colorScheme.primary}20`,
                animationDuration: '1.5s'
              }}
            />
            <div 
              className="absolute -inset-2 rounded-xl animate-ping opacity-30"
              style={{
                background: `${colorScheme.accent}30`,
                animationDuration: '2s'
              }}
            />
          </>
        )}
      </div>
      
      {/* Enhanced shadow for depth */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 rounded-xl blur-sm opacity-30",
          "group-hover:opacity-50 transition-opacity duration-300"
        )}
        style={{
          background: `linear-gradient(135deg, ${colorScheme.primary}60, ${colorScheme.secondary}40)`,
          transform: 'translateY(2px) scale(0.95)'
        }}
      />
    </div>
  );
};