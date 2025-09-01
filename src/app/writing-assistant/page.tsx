'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Check, X, Loader2, Sun, Moon, Copy, FileText,
  Bold, Italic, Underline, Link, AlignLeft, AlignCenter, 
  AlignRight, List, ListOrdered, IndentDecrease, IndentIncrease,
  Palette, MoveVertical
} from 'lucide-react';
import { generateContent } from '@/lib/gemini';

// Translations object
const TRANSLATIONS = {
  "en-US": {
    "appTitle": "Claude Writing Assistant",
    "yourText": "Your Text",
    "sample": "Sample",
    "copy": "Copy",
    "fontFamily": "Font Family",
    "fontSize": "Font Size",
    "bold": "Bold",
    "italic": "Italic",
    "underline": "Underline",
    "textColor": "Text Color",
    "addLink": "Add Link",
    "alignLeft": "Align Left",
    "alignCenter": "Align Center",
    "alignRight": "Align Right",
    "lineSpacing": "Line Spacing",
    "bulletList": "Bullet List",
    "numberedList": "Numbered List",
    "decreaseIndent": "Decrease Indent",
    "increaseIndent": "Increase Indent",
    "addLinkTitle": "Add Link",
    "enterUrl": "Enter URL",
    "add": "Add",
    "cancel": "Cancel",
    "characters": "characters",
    "analyzeText": "Analyze Text",
    "analyzing": "Analyzing...",
    "suggestions": "Suggestions",
    "all": "All",
    "grammar": "Grammar",
    "spelling": "Spelling",
    "punctuation": "Punctuation",
    "style": "Style",
    "clarity": "Clarity",
    "clickAnalyzeText": "Click 'Analyze Text' to get suggestions",
    "noSuggestionsCategory": "No suggestions in this category",
    "applySuggestion": "Apply suggestion",
    "dismiss": "Dismiss",
    "textHighlightColor": "Text highlight color",
    "applyAllSuggestions": "Apply All Suggestions",
    "pleaseEnterText": "Please enter some text to analyze",
    "failedToAnalyze": "Failed to analyze text. Please try again.",
    "failedToParse": "Failed to parse suggestions. Please try again.",
    "reject": "Reject",
    "accept": "Accept"
  },
  "es-ES": {
    "appTitle": "Asistente de Escritura Claude",
    "yourText": "Tu Texto",
    "sample": "Muestra",
    "copy": "Copiar",
    "fontFamily": "Familia de Fuente",
    "fontSize": "Tamaño de Fuente",
    "bold": "Negrita",
    "italic": "Cursiva",
    "underline": "Subrayado",
    "textColor": "Color de Texto",
    "addLink": "Agregar Enlace",
    "alignLeft": "Alinear a la Izquierda",
    "alignCenter": "Centrar",
    "alignRight": "Alinear a la Derecha",
    "lineSpacing": "Espaciado de Línea",
    "bulletList": "Lista con Viñetas",
    "numberedList": "Lista Numerada",
    "decreaseIndent": "Disminuir Sangría",
    "increaseIndent": "Aumentar Sangría",
    "addLinkTitle": "Agregar Enlace",
    "enterUrl": "Ingresa URL",
    "add": "Agregar",
    "cancel": "Cancelar",
    "characters": "caracteres",
    "analyzeText": "Analizar Texto",
    "analyzing": "Analizando...",
    "suggestions": "Sugerencias",
    "all": "Todas",
    "grammar": "Gramática",
    "spelling": "Ortografía",
    "punctuation": "Puntuación",
    "style": "Estilo",
    "clarity": "Claridad",
    "clickAnalyzeText": "Haz clic en 'Analizar Texto' para obtener sugerencias",
    "noSuggestionsCategory": "No hay sugerencias en esta categoría",
    "applySuggestion": "Aplicar sugerencia",
    "dismiss": "Descartar",
    "textHighlightColor": "Color de resaltado de texto",
    "applyAllSuggestions": "Aplicar Todas las Sugerencias",
    "pleaseEnterText": "Por favor ingresa algún texto para analizar",
    "failedToAnalyze": "Error al analizar el texto. Por favor intenta de nuevo.",
    "failedToParse": "Error al procesar las sugerencias. Por favor intenta de nuevo.",
    "reject": "Rechazar",
    "accept": "Aceptar"
  }
};

const appLocale = 'APP_LOCALE';
const findMatchingLocale = (locale: string) => {
  if (TRANSLATIONS[locale as keyof typeof TRANSLATIONS]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};

const locale = 'en-US'; // Default to English for now
const t = (key: string) => TRANSLATIONS[locale as keyof typeof TRANSLATIONS]?.[key as keyof typeof TRANSLATIONS['en-US']] || TRANSLATIONS['en-US'][key as keyof typeof TRANSLATIONS['en-US']] || key;

export default function WritingAssistant() {
  const [text, setText] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLineSpacing, setShowLineSpacing] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, isBelow: false });
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Ensure client-side only rendering to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    { id: 'all', label: t('all'), color: 'bg-purple-500' },
    { id: 'grammar', label: t('grammar'), color: 'bg-blue-500' },
    { id: 'spelling', label: t('spelling'), color: 'bg-red-500' },
    { id: 'punctuation', label: t('punctuation'), color: 'bg-yellow-500' },
    { id: 'style', label: t('style'), color: 'bg-green-500' },
    { id: 'clarity', label: t('clarity'), color: 'bg-indigo-500' }
  ];

  const sampleTexts = [
    'Human welfare is at the heart of our work: our mission is to make sure that increasingly capable and sophisticated AI systems remain beneficial to humanity.\n\nBut as we build those AI systems, and as they begin to approximate or surpass many human qualities, another question arises. Should we also be concerned about the potential consciousness and experiences of the models themselves?\n\nThis is an open question, and one that\'s both philosophically and scientifically difficult. But now that models can communicate, relate, plan, problem-solve, and pursue goals—along with very many more characteristics we associate with people—we think it\'s time to address it.'
  ];

  const fonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' }
  ];

  const textSizes = [
    { value: '13.33px', label: '10' },
    { value: '14.67px', label: '11' },
    { value: '16px', label: '12' },
    { value: '18.67px', label: '14' },
    { value: '21.33px', label: '16' },
    { value: '24px', label: '18' },
    { value: '32px', label: '24' },
    { value: '48px', label: '36' }
  ];

  const lineSpacings = [
    { value: '1', label: '1.0' },
    { value: '1.15', label: '1.15' },
    { value: '1.5', label: '1.5' },
    { value: '2', label: '2.0' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'
  ];

  // Execute formatting command
  const formatText = (command: string, value: any = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    updateContent();
  };

  // Update content and extract plain text
  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      
      // Create a temporary element to extract text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Remove mark tags but keep their content
      const marks = tempDiv.querySelectorAll('mark');
      marks.forEach(mark => {
        const textNode = document.createTextNode(mark.textContent || '');
        mark.parentNode?.replaceChild(textNode, mark);
      });
      
      // Convert <br> tags to newlines
      tempDiv.innerHTML = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      
      const plainText = tempDiv.textContent || '';
      setText(plainText);
    }
  };

  // Initialize editor on mount - client side only
  useEffect(() => {
    if (isClient && editorRef.current && editorRef.current.innerHTML === '') {
      editorRef.current.innerHTML = '<div><br></div>';
    }
  }, [isClient]);

  // Update highlights when suggestions change
  useEffect(() => {
    applyHighlights();
  }, [suggestions]);

  const analyzeText = async () => {
    if (!text.trim()) {
      setError(t('pleaseEnterText'));
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setSuggestions([]);

    try {
      const prompt = `Analyze the following text and provide specific suggestions for improvement. Focus on grammar, spelling, punctuation, style, and clarity.

Text to analyze:
"${text}"

Respond with a JSON array of suggestion objects. Each object should have:
- category: one of "grammar", "spelling", "punctuation", "style", or "clarity"
- issue: the EXACT text that needs improvement
- suggestion: the corrected or improved version
- explanation: a brief explanation of why this change improves the text

Only include actual issues that need correction. If the text is perfect, return an empty array.

Your entire response must be a valid JSON array. DO NOT include any text outside the JSON structure.`;

      const response = await generateContent(prompt);
      
      try {
        // Clean the response to extract just the JSON
        const cleanedResponse = response.replace(/```json\n?|```\n?/g, '').trim();
        const parsedSuggestions = JSON.parse(cleanedResponse);
        if (Array.isArray(parsedSuggestions)) {
          setSuggestions(parsedSuggestions);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.log('Raw response:', response);
        setError(t('failedToParse'));
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(t('failedToAnalyze'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSampleText = () => {
    const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    if (editorRef.current) {
      const paragraphs = randomSample.split('\n\n').map(p => p.trim()).filter(p => p);
      const htmlContent = paragraphs
        .map(p => `<div style="font-family: Arial; font-size: 16px;">${p}</div>`)
        .join('<div><br></div>');
      
      editorRef.current.innerHTML = htmlContent;
      const lastDiv = document.createElement('div');
      lastDiv.innerHTML = '<br>';
      editorRef.current.appendChild(lastDiv);
      
      updateContent();
    }
  };

  const copyText = () => {
    if (!editorRef.current) return;
    
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const filteredSuggestions = activeCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === activeCategory);

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-gray-500';
  };

  const applySuggestion = (suggestion: any) => {
    if (!editorRef.current) return;
    
    // Get the current content without highlights
    let content = editorRef.current.innerHTML;
    content = content.replace(/<mark[^>]*>(.*?)<\/mark>/g, '$1');
    
    // Try to find and replace the suggestion
    const issueText = suggestion.issue;
    const replacementText = suggestion.suggestion;
    
    // Escape special characters for HTML
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    // Try multiple replacement strategies
    const patterns = [
      issueText, // Original text
      escapeHtml(issueText), // HTML-escaped version
      issueText.replace(/"/g, '&quot;').replace(/'/g, '&#039;') // Only escape quotes
    ];
    
    let replaced = false;
    for (const pattern of patterns) {
      if (content.includes(pattern)) {
        content = content.replace(pattern, escapeHtml(replacementText));
        replaced = true;
        break;
      }
    }
    
    if (!replaced) {
      console.log(`Could not find text to replace: "${issueText}"`);
    }
    
    // Update the editor
    editorRef.current.innerHTML = content;
    updateContent();
    
    // Remove the applied suggestion
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

  const dismissSuggestion = (suggestion: any) => {
    setSuggestions(suggestions.filter(s => s !== suggestion));
  };

  // Apply highlights to text based on suggestions
  const applyHighlights = () => {
    if (!editorRef.current) return;
    
    // Get the current HTML content
    let content = editorRef.current.innerHTML;
    
    // Remove existing highlights
    content = content.replace(/<mark[^>]*>(.*?)<\/mark>/g, '$1');
    
    // If no suggestions, just update the content without highlights
    if (suggestions.length === 0) {
      editorRef.current.innerHTML = content;
      return;
    }
    
    // Apply new highlights for each suggestion
    suggestions.forEach(suggestion => {
      const categoryColors = {
        grammar: 'rgba(59, 130, 246, 0.3)', // blue
        spelling: 'rgba(239, 68, 68, 0.3)', // red
        punctuation: 'rgba(245, 158, 11, 0.3)', // yellow
        style: 'rgba(34, 197, 94, 0.3)', // green
        clarity: 'rgba(99, 102, 241, 0.3)' // indigo
      };
      
      const color = categoryColors[suggestion.category as keyof typeof categoryColors] || 'rgba(147, 51, 234, 0.3)';
      
      // Escape special characters for HTML content matching
      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      };
      
      // Try to find and highlight the issue text
      const issueText = suggestion.issue;
      const escapedIssue = escapeHtml(issueText);
      
      // Try multiple matching strategies
      const patterns = [
        issueText, // Original text
        escapedIssue, // HTML-escaped version
        issueText.replace(/"/g, '&quot;').replace(/'/g, '&#039;'), // Only escape quotes
      ];
      
      let highlighted = false;
      for (const pattern of patterns) {
        if (content.includes(pattern)) {
          content = content.replace(
            pattern,
            `<mark data-issue="${encodeURIComponent(issueText)}" style="background-color: ${color}; padding: 2px 0; border-radius: 2px; cursor: pointer; transition: filter 0.2s;" onmouseover="this.style.filter='brightness(0.85)'" onmouseout="this.style.filter='brightness(1)'">${pattern}</mark>`
          );
          highlighted = true;
          break;
        }
      }
      
      // If not found, try a more flexible approach
      if (!highlighted) {
        console.log(`Could not highlight: "${issueText}" in category ${suggestion.category}`);
      }
    });
    
    // Update the editor content
    editorRef.current.innerHTML = content;
  };

  // Toolbar button component
  const ToolbarButton = ({ icon: Icon, onClick, onMouseDown, title, active = false }: {
    icon: any;
    onClick?: (e?: React.MouseEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    title: string;
    active?: boolean;
  }) => (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      title={title}
      className={`p-2 rounded transition-colors hover:scale-105 ${
        active 
          ? isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
          : isDarkMode 
            ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
            : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const ToolbarSeparator = () => (
    <div className={`w-px h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
  );

  return (
    <>
      {!isClient ? (
        // Show loading state during hydration
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-pulse">
                <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-4"></div>
                <div className="text-lg font-medium text-gray-600">Loading Writing Assistant...</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('appTitle')}
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Editor Panel */}
          <div className={`rounded-xl shadow-lg p-4 lg:p-6 relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className={`text-lg lg:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('yourText')}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={loadSampleText}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('sample')}</span>
                </button>
                <button
                  onClick={copyText}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('copy')}</span>
                </button>
              </div>
            </div>

            {/* Formatting Toolbar */}
            <div className={`flex flex-wrap items-center gap-1 p-2 mb-2 rounded-lg border ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'
            }`}>
              {/* Font Selection */}
              <select
                onChange={(e) => formatText('fontName', e.target.value)}
                defaultValue="Arial"
                className={`px-2 py-1 rounded text-sm min-w-[80px] ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 border-gray-600' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                title={t('fontFamily')}
              >
                {fonts.map(font => (
                  <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                    {font.label}
                  </option>
                ))}
              </select>

              {/* Text Size */}
              <select
                onChange={(e) => formatText('fontSize', e.target.value)}
                defaultValue="16px"
                className={`px-2 py-1 rounded text-sm min-w-[60px] ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 border-gray-600' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
                title={t('fontSize')}
              >
                {textSizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>

              <ToolbarSeparator />

              <ToolbarButton icon={Bold} onClick={() => formatText('bold')} title={t('bold')} />
              <ToolbarButton icon={Italic} onClick={() => formatText('italic')} title={t('italic')} />
              <ToolbarButton icon={Underline} onClick={() => formatText('underline')} title={t('underline')} />
              
              <ToolbarSeparator />
              
              <div className="relative" data-dropdown="color">
                <ToolbarButton 
                  icon={Palette} 
                  onClick={(e?: React.MouseEvent) => {
                    e?.stopPropagation();
                    setShowColorPicker(!showColorPicker);
                  }} 
                  title={t('textColor')} 
                />
                {showColorPicker && (
                  <div className={`absolute top-10 left-0 sm:left-auto sm:right-0 p-2 rounded-lg shadow-lg z-10 ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="grid grid-cols-5 gap-1">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            formatText('foreColor', color);
                            setShowColorPicker(false);
                          }}
                          className="w-6 h-6 rounded border border-gray-400 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <ToolbarButton icon={Link} onClick={() => setShowLinkDialog(true)} title={t('addLink')} />
              
              <ToolbarSeparator />
              
              <ToolbarButton icon={AlignLeft} onClick={() => formatText('justifyLeft')} title={t('alignLeft')} />
              <ToolbarButton icon={AlignCenter} onClick={() => formatText('justifyCenter')} title={t('alignCenter')} />
              <ToolbarButton icon={AlignRight} onClick={() => formatText('justifyRight')} title={t('alignRight')} />
              
              <ToolbarSeparator />
              
              <div className="relative" data-dropdown="line-spacing">
                <ToolbarButton 
                  icon={MoveVertical} 
                  onClick={(e?: React.MouseEvent) => {
                    e?.stopPropagation();
                    setShowLineSpacing(!showLineSpacing);
                  }} 
                  title={t('lineSpacing')} 
                />
                {showLineSpacing && (
                  <div className={`absolute top-10 left-0 sm:left-auto sm:right-0 p-2 rounded-lg shadow-lg z-10 min-w-[100px] ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex flex-col gap-1">
                      {lineSpacings.map(spacing => (
                        <button
                          key={spacing.value}
                          onClick={() => {
                            if (editorRef.current) {
                              editorRef.current.style.lineHeight = spacing.value;
                            }
                            setShowLineSpacing(false);
                          }}
                          className={`px-3 py-1 text-sm text-left rounded hover:bg-opacity-10 ${
                            isDarkMode ? 'hover:bg-white text-gray-300' : 'hover:bg-black text-gray-700'
                          }`}
                        >
                          {spacing.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <ToolbarSeparator />
              
              <ToolbarButton 
                icon={List} 
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText('insertUnorderedList');
                }} 
                title={t('bulletList')} 
              />
              <ToolbarButton 
                icon={ListOrdered} 
                onMouseDown={(e) => {
                  e.preventDefault();
                  formatText('insertOrderedList');
                }} 
                title={t('numberedList')} 
              />
              <ToolbarButton icon={IndentDecrease} onClick={() => formatText('outdent')} title={t('decreaseIndent')} />
              <ToolbarButton icon={IndentIncrease} onClick={() => formatText('indent')} title={t('increaseIndent')} />
            </div>
            
            {/* Rich Text Editor */}
            <div
              ref={editorRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              suppressHydrationWarning={true}
              onInput={updateContent}
              className={`w-full h-96 p-4 rounded-lg border transition-colors overflow-y-auto focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-700 text-white focus:ring-purple-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-400'
              }`}
              style={{ 
                minHeight: '24rem',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.5'
              }}
            />
            
            <div className="mt-4 flex justify-between items-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {text.length} {t('characters')}
              </span>
              <button
                onClick={analyzeText}
                disabled={isAnalyzing || !text.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2 ${
                  isAnalyzing || !text.trim()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('analyzing')}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t('analyzeText')}
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Suggestions Panel */}
          <div className={`rounded-xl shadow-lg p-4 lg:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-lg lg:text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('suggestions')}
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? `${category.color} text-white`
                      : isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.slice(0, 3)}</span>
                  {suggestions.filter(s => category.id === 'all' || s.category === category.id).length > 0 && (
                    <span className="ml-1">
                      ({suggestions.filter(s => category.id === 'all' || s.category === category.id).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredSuggestions.length === 0 ? (
                <div className={`text-center py-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {suggestions.length === 0 
                    ? t('clickAnalyzeText')
                    : t('noSuggestionsCategory')}
                </div>
              ) : (
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-3 lg:p-4 rounded-lg border transition-all hover:shadow-md ${
                      isDarkMode 
                        ? 'bg-gray-900 border-gray-700 hover:border-gray-600' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(suggestion.category)} flex-shrink-0`}>
                          <span className="hidden sm:inline">{suggestion.category}</span>
                          <span className="sm:hidden">{suggestion.category.slice(0, 4)}</span>
                        </span>
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ 
                            backgroundColor: (() => {
                              const categoryColors = {
                                grammar: 'rgba(59, 130, 246, 0.5)',
                                spelling: 'rgba(239, 68, 68, 0.5)',
                                punctuation: 'rgba(245, 158, 11, 0.5)',
                                style: 'rgba(34, 197, 94, 0.5)',
                                clarity: 'rgba(99, 102, 241, 0.5)'
                              };
                              return categoryColors[suggestion.category as keyof typeof categoryColors] || 'rgba(147, 51, 234, 0.5)';
                            })()
                          }}
                          title={t('textHighlightColor')}
                        />
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => applySuggestion(suggestion)}
                          className="p-1.5 lg:p-2 rounded-full hover:bg-green-500/20 text-green-500 transition-colors"
                          title={t('accept')}
                        >
                          <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                        <button
                          onClick={() => dismissSuggestion(suggestion)}
                          className="p-1.5 lg:p-2 rounded-full hover:bg-red-500/20 text-red-500 transition-colors"
                          title={t('reject')}
                        >
                          <X className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                        <span className={`line-through break-words ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                          {suggestion.issue}
                        </span>
                        <span className={`hidden sm:inline ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>→</span>
                        <span className={`font-medium break-words ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {suggestion.suggestion}
                        </span>
                      </div>
                      
                      <p className={`text-xs lg:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} break-words`}>
                        {suggestion.explanation}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {suggestions.length > 0 && (
              <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => {
                    if (!editorRef.current) return;
                    
                    // Get content without highlights
                    let content = editorRef.current.innerHTML;
                    content = content.replace(/<mark[^>]*>(.*?)<\/mark>/g, '$1');
                    
                    // Escape special characters for HTML
                    const escapeHtml = (text: string) => {
                      return text
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;');
                    };
                    
                    // Apply all suggestions
                    suggestions.forEach(suggestion => {
                      const issueText = suggestion.issue;
                      const replacementText = suggestion.suggestion;
                      
                      // Try multiple patterns
                      const patterns = [
                        issueText,
                        escapeHtml(issueText),
                        issueText.replace(/"/g, '&quot;').replace(/'/g, '&#039;')
                      ];
                      
                      for (const pattern of patterns) {
                        if (content.includes(pattern)) {
                          content = content.replace(pattern, escapeHtml(replacementText));
                          break;
                        }
                      }
                    });
                    
                    // Update editor
                    editorRef.current.innerHTML = content;
                    updateContent();
                    
                    // Clear all suggestions
                    setSuggestions([]);
                  }}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  {t('applyAllSuggestions')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  );
}