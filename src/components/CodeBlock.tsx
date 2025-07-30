import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { X, GripVertical } from 'lucide-react';
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

  const renderCodeWithInputs = () => {
    const codeTemplate = block.code[language] || '';
    let result = codeTemplate;
    
    // Replace placeholders with input fields or values
    Object.entries(inputs).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      if (result.includes(placeholder)) {
        result = result.replace(
          placeholder,
          `<input class="inline-input" data-key="${key}" value="${value}" />`
        );
      }
    });
    
    return result;
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={cn(
        "group relative px-4 py-3 rounded-lg text-block-text font-mono text-sm",
        "border border-block-border shadow-sm transition-all duration-200",
        "hover:shadow-md cursor-move",
        isDragging && "opacity-50 rotate-2 scale-105"
      )}
      style={{
        backgroundColor: `hsl(var(--${block.color}))`,
      }}
    >
      {/* Drag handle */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity">
        <GripVertical className="w-4 h-4" />
      </div>
      
      {/* Delete button */}
      <button
        onClick={() => onDelete(block.id)}
        className="absolute right-1 top-1 opacity-0 group-hover:opacity-80 hover:opacity-100 
                   bg-red-500 rounded-full p-1 transition-all duration-200"
      >
        <X className="w-3 h-3 text-white" />
      </button>

      {/* Code content */}
      <div className="pl-6 pr-8">
        {block.inputs && Object.keys(block.inputs).length > 0 ? (
          <div className="space-y-1">
            {/* Show template with inline inputs */}
            <div 
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: renderCodeWithInputs().replace(
                  /<input class="inline-input" data-key="([^"]*)" value="([^"]*)" \/>/g,
                  (_, key, value) => 
                    `<span class="inline-block bg-white/20 px-1 rounded border border-white/30 min-w-[60px] text-center cursor-text" 
                     contenteditable="true" 
                     onblur="this.dataset.changed && window.updateBlockInput('${block.id}', '${key}', this.textContent)"
                     oninput="this.dataset.changed = true">${value}</span>`
                )
              }}
            />
          </div>
        ) : (
          <div>{block.code[language]}</div>
        )}
      </div>

      {/* Individual input fields (fallback) */}
      {block.inputs && Object.entries(block.inputs).map(([key, value]) => {
        // Only show if not already shown inline
        const codeTemplate = block.code[language] || '';
        if (!codeTemplate.includes(`{${key}}`)) {
          return (
            <div key={key} className="mt-2 flex items-center gap-2">
              <label className="text-xs opacity-80">{key}:</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="bg-white/20 px-2 py-1 rounded text-xs border border-white/30 
                         focus:outline-none focus:ring-1 focus:ring-white/50"
                placeholder={key}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

// Global function for inline editing
declare global {
  interface Window {
    updateBlockInput: (blockId: string, key: string, value: string) => void;
  }
}