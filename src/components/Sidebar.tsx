import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Language, BlockCategory } from '@/types/blocks';
import { blockTemplates } from '@/data/blockTemplates';
import { DraggableBlock } from './DraggableBlock';
import { cn } from '@/lib/utils';

interface SidebarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const categories: { id: BlockCategory; label: string; }[] = [
  { id: 'includes', label: 'Includes/Imports' },
  { id: 'io', label: 'Input/Output' },
  { id: 'variables', label: 'Variables' },
  { id: 'conditionals', label: 'Conditionals' },
  { id: 'loops', label: 'Loops' },
  { id: 'functions', label: 'Functions' },
  { id: 'operators', label: 'Operators' },
];

const languages: { value: Language; label: string }[] = [
  { value: 'c', label: 'C' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
];

export const Sidebar = ({ language, onLanguageChange }: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<BlockCategory>>(
    new Set(['includes', 'io', 'variables'])
  );

  const toggleCategory = (category: BlockCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getBlocksForCategory = (category: BlockCategory) => {
    return blockTemplates.filter(block => {
      return block.category === category && block.language === language;
    });
  };

  return (
    <div className="w-80 h-full bg-zerocodes-sidebar border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-foreground mb-3">Zerocodes</h1>
        
        {/* Language Selector */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Programming Language</label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="w-full px-3 py-2 rounded-md bg-background border border-border 
                     text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Block Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {categories.map(category => {
          const blocks = getBlocksForCategory(category.id);
          const isExpanded = expandedCategories.has(category.id);
          
          if (blocks.length === 0) return null;

          return (
            <div key={category.id} className="space-y-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md",
                  "bg-muted/50 hover:bg-muted transition-colors",
                  "text-left text-sm font-medium text-foreground"
                )}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                {category.label}
                <span className="ml-auto text-xs text-muted-foreground">
                  {blocks.length}
                </span>
              </button>

              {/* Category Blocks */}
              {isExpanded && (
                <div className="space-y-2 pl-2">
                  {blocks.map(block => (
                    <DraggableBlock key={block.id} block={block} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Drag blocks to the canvas to build your program
        </p>
      </div>
    </div>
  );
};