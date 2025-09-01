'use client';

import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface LanguageSelectorProps {
  value: SupportedLanguage;
  onChange: (language: SupportedLanguage) => void;
  label: string;
}

export function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        <div className="flex items-center space-x-4">
          <div className="text-2xl">{selectedLanguage?.icon}</div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLanguage?.label}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl z-20 max-h-64 overflow-y-auto">
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.value}
              onClick={() => {
                onChange(language.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-4 px-5 py-4 hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-200 text-left first:rounded-t-xl last:rounded-b-xl group"
            >
              <div className="text-xl group-hover:scale-110 transition-transform duration-200">{language.icon}</div>
              <span className="font-medium text-slate-800 dark:text-slate-200">{language.label}</span>
              {language.value === value && (
                <span className="ml-auto text-blue-600 dark:text-blue-400 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

