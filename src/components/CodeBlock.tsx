import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { X, GripVertical, Code2, Edit3 } from 'lucide-react';
import { CodeBlock as CodeBlockType, Language } from '@/types/blocks';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  block: CodeBlockType;
  language: Language;
  onUpdate: (id: string, inputs: Record<string, string>) => void;
  onDelete: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export const CodeBlock = ({ 
  block, 
  language, 
  onUpdate, 
  onDelete, 
  onMove, 
  index 
}: CodeBlockProps) => {
  const [inputs, setInputs] = useState(block.inputs);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'canvas-block',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'canvas-block',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  const handleInputChange = (inputName: string, value: string) => {
    const newInputs = { ...inputs, [inputName]: value };
    setInputs(newInputs);
    onUpdate(block.id, newInputs);
  };

  const getBlockGradient = (color: string) => {
    const gradients = {
      'block-motion': 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
      'block-looks': 'from-green-500/20 to-emerald-500/20 border-green-400/30',
      'block-sound': 'from-purple-500/20 to-violet-500/20 border-purple-400/30',
      'block-events': 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
      'block-control': 'from-orange-500/20 to-red-500/20 border-orange-400/30',
      'block-sensing': 'from-cyan-500/20 to-blue-500/20 border-cyan-400/30',
      'block-operators': 'from-violet-500/20 to-purple-500/20 border-violet-400/30',
      'block-variables': 'from-orange-500/20 to-yellow-500/20 border-orange-400/30',
    };
    return gradients[color as keyof typeof gradients] || 'from-gray-500/20 to-slate-500/20 border-gray-400/30';
  };

  const renderCodeWithInputs = () => {
    const codeTemplate = block.code[language] || '';
    let result = codeTemplate;
    
    // Replace placeholders with input fields or values
    Object.entries(inputs).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      if (result.includes(placeholder)) {
        result = result.replace(
          placeholder,
          `<span class="inline-input-highlight" data-key="${key}">${value || key}</span>`
        );
      }
    });
    
    return result;
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={cn(
        "group relative transition-all duration-300",
        "glass-effect rounded-xl border backdrop-blur-sm",
        `bg-gradient-to-r ${getBlockGradient(block.color)}`,
        isDragging && "opacity-60 rotate-1 scale-105 shadow-xl",
        !isDragging && "hover:scale-[1.02] interactive-lift"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="opacity-0 group-hover:opacity-70 transition-opacity cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-white/70" />
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-white/80" />
            <span className="text-sm font-medium text-white/90">{block.label}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {Object.keys(inputs).length > 0 && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 interactive-scale"
            >
              <Edit3 className="w-4 h-4 text-white/80" />
            </button>
          )}
          <button
            onClick={() => onDelete(block.id)}
            className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center transition-all duration-200 interactive-scale"
          >
            <X className="w-4 h-4 text-red-200" />
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="p-4">
        <div className="font-mono text-sm text-white/90 leading-relaxed">
          {block.inputs && Object.keys(block.inputs).length > 0 ? (
            <div className="space-y-2">
              {/* Code with inline highlights */}
              <div 
                className="whitespace-pre-wrap p-3 bg-black/20 rounded-lg border border-white/10"
                dangerouslySetInnerHTML={{ 
                  __html: renderCodeWithInputs().replace(
                    /<span class="inline-input-highlight" data-key="([^"]*)">(.*?)<\/span>/g,
                    (_, key, value) => 
                      `<span class="inline-block bg-blue-400/20 text-blue-200 px-2 py-1 rounded border border-blue-400/30 min-w-[60px] text-center font-medium cursor-text transition-all duration-200 hover:bg-blue-400/30" 
                       contenteditable="true" 
                       onblur="this.dataset.changed && window.updateBlockInput('${block.id}', '${key}', this.textContent)"
                       oninput="this.dataset.changed = true">${value}</span>`
                  )
                }}
              />
              
              {/* Input fields when editing */}
              {isEditing && (
                <div className="mt-4 space-y-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xs font-medium text-white/70 mb-2">Edit Parameters:</div>
                  {Object.entries(inputs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <label className="text-xs text-white/70 min-w-[80px] font-medium">{key}:</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 px-3 py-2 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                        placeholder={`Enter ${key}...`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-black/20 rounded-lg border border-white/10">
              {block.code[language]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Global function for inline editing
declare global {
  interface Window {
    updateBlockInput: (blockId: string, key: string, value: string) => void;
  }
}