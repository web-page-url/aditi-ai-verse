'use client';

import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({ value, onChange, placeholder, readOnly, className }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full h-72 md:h-96 p-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200"
          spellCheck={false}
        />

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {value && (
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 dark:hover:bg-black/30 hover:scale-110 shadow-lg"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          )}
        </button>
      )}
    </div>
  );
}

