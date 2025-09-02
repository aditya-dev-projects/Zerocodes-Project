import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { X, GripVertical, Code2, Edit3 } from 'lucide-react';
import { CodeBlock as CodeBlockType, Language } from '@/types/blocks';
import { cn } from '@/lib/utils';

// =============================================================================
// INTERFACES & TYPES
// =============================================================================

interface CodeBlockProps {
  block: CodeBlockType;
  language: Language;
  onUpdate: (id: string, inputs: Record<string, string>) => void;
  onDelete: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

// Global window interface extension for inline editing
declare global {
  interface Window {
    updateBlockInput: (blockId: string, key: string, value: string) => void;
  }
}

// =============================================================================
// CONSTANTS & UTILITIES
// =============================================================================

const BLOCK_COLORS = {
  'block-motion': 'bg-emerald-600/80 border-emerald-400/50',
  'block-looks': 'bg-purple-600/80 border-purple-400/50',
  'block-sound': 'bg-pink-600/80 border-pink-400/50',
  'block-events': 'bg-orange-600/80 border-orange-400/50',
  'block-control': 'bg-red-600/80 border-red-400/50',
  'block-sensing': 'bg-blue-600/80 border-blue-400/50',
  'block-operators': 'bg-teal-600/80 border-teal-400/50',
  'block-variables': 'bg-violet-600/80 border-violet-400/50',
} as const;

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const CodeBlock = ({ 
  block, 
  language, 
  onUpdate, 
  onDelete, 
  onMove, 
  index 
}: CodeBlockProps) => {
  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  const [inputs, setInputs] = useState(block.inputs);
  const [isEditing, setIsEditing] = useState(false);

  // ---------------------------------------------------------------------------
  // DRAG & DROP FUNCTIONALITY
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // UTILITY FUNCTIONS
  // ---------------------------------------------------------------------------
  
  /**
   * Get the appropriate color style for a block color
   */
  const getBlockColor = (color: string): string => {
    return BLOCK_COLORS[color as keyof typeof BLOCK_COLORS] || 
           'bg-gray-600/80 border-gray-400/50';
  };

  /**
   * Handle input field changes and update parent component
   */
  const handleInputChange = (inputName: string, value: string): void => {
    const newInputs = { ...inputs, [inputName]: value };
    setInputs(newInputs);
    onUpdate(block.id, newInputs);
  };

  /**
   * Render code template with inline input highlights
   */
  const renderCodeWithInputs = (): string => {
    const codeTemplate = block.code[language] || '';
    let result = codeTemplate;
    
    // Replace placeholders with highlighted spans
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

  /**
   * Generate inline editable HTML for code display
   */
  const generateInlineEditableHTML = (codeWithInputs: string): string => {
    return codeWithInputs.replace(
      /<span class="inline-input-highlight" data-key="([^"]*)">(.*?)<\/span>/g,
      (_, key, value) => `
        <span class="inline-block bg-blue-400/20 text-blue-200 px-2 py-1 rounded border border-blue-400/30 min-w-[60px] text-center font-medium cursor-text transition-all duration-200 hover:bg-blue-400/30" 
              contenteditable="true" 
              onblur="this.dataset.changed && window.updateBlockInput('${block.id}', '${key}', this.textContent)"
              oninput="this.dataset.changed = true">${value}</span>
      `.trim()
    );
  };

  // ---------------------------------------------------------------------------
  // CONDITIONAL RENDERING HELPERS
  // ---------------------------------------------------------------------------
  
  const hasInputs = block.inputs && Object.keys(block.inputs).length > 0;

  // ---------------------------------------------------------------------------
  // RENDER COMPONENT
  // ---------------------------------------------------------------------------
  
  return (
    <div
      ref={(node) => drag(drop(node))}
      className={cn(
        // Base styles
        "group relative transition-all duration-300",
        "glass-effect rounded-xl border backdrop-blur-sm",
        
        // Dynamic color based on block color
        getBlockColor(block.color),
        
        // Drag state styles
        isDragging && "opacity-60 rotate-1 scale-105 shadow-xl",
        !isDragging && "hover:scale-[1.02] interactive-lift"
      )}
    >
      {/* =================================================================== */}
      {/* HEADER SECTION */}
      {/* =================================================================== */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {/* Left side - Drag handle and title */}
        <div className="flex items-center gap-3">
          <div className="opacity-0 group-hover:opacity-70 transition-opacity cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-white/70" />
          </div>
          
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-white/80" />
            <span className="text-sm font-medium text-white/90">
              {block.label}
            </span>
          </div>
        </div>
        
        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Edit button - only show if block has inputs */}
          {hasInputs && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 interactive-scale"
              title="Edit parameters"
            >
              <Edit3 className="w-4 h-4 text-white/80" />
            </button>
          )}
          
          {/* Delete button */}
          <button
            onClick={() => onDelete(block.id)}
            className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center transition-all duration-200 interactive-scale"
            title="Delete block"
          >
            <X className="w-4 h-4 text-red-200" />
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CODE CONTENT SECTION */}
      {/* =================================================================== */}
      <div className="p-4">
        <div className="font-mono text-sm text-white/90 leading-relaxed">
          {hasInputs ? (
            <div className="space-y-2">
              {/* Code display with inline highlights */}
              <div 
                className="whitespace-pre-wrap p-3 bg-black/20 rounded-lg border border-white/10"
                dangerouslySetInnerHTML={{ 
                  __html: generateInlineEditableHTML(renderCodeWithInputs())
                }}
              />
              
              {/* Parameter editing panel */}
              {isEditing && (
                <div className="mt-4 space-y-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xs font-medium text-white/70 mb-2">
                    Edit Parameters:
                  </div>
                  
                  {Object.entries(inputs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <label className="text-xs text-white/70 min-w-[80px] font-medium">
                        {key}:
                      </label>
                      
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
            // Simple code display without inputs
            <div className="p-3 bg-black/20 rounded-lg border border-white/10">
              {block.code[language]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};