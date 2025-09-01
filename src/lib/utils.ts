import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SUPPORTED_LANGUAGES = [
  { value: 'c', label: 'C', color: 'bg-blue-500', icon: '🔧' },
  { value: 'cpp', label: 'C++', color: 'bg-blue-600', icon: '⚡' },
  { value: 'python', label: 'Python', color: 'bg-yellow-500', icon: '🐍' },
  { value: 'java', label: 'Java', color: 'bg-orange-500', icon: '☕' },
  { value: 'javascript', label: 'JavaScript', color: 'bg-yellow-400', icon: '🟨' },
  { value: 'typescript', label: 'TypeScript', color: 'bg-blue-500', icon: '🔷' },
  { value: 'ruby', label: 'Ruby', color: 'bg-red-500', icon: '💎' },
  { value: 'php', label: 'PHP', color: 'bg-purple-500', icon: '🐘' },
  { value: 'rust', label: 'Rust', color: 'bg-orange-600', icon: '🦀' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['value'];
