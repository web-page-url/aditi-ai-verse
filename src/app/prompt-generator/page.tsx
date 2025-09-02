'use client';

import { useState, useEffect } from 'react';
import { Wand2, Copy, Check, Sparkles, RefreshCw, Zap, Target, Lightbulb, Sun, Moon } from 'lucide-react';
import { generateContent } from '@/lib/gemini';

const TRANSLATIONS = {
  "en-US": {
    "textToPromptGenerator": "Text-to-Prompt Generator",
    "transformDescription": "Transform your simple text into powerful, detailed prompts for AI models",
    "yourText": "Your Text Input",
    "textPlaceholder": "Enter your basic idea or text here... We'll transform it into a detailed, effective prompt.",
    "tipKeyboardShortcut": "💡 Tip: Press Cmd/Ctrl + Enter to generate your prompt",
    "promptType": "Prompt Type",
    "creative": "Creative",
    "creativeDescription": "For artistic and imaginative tasks",
    "technical": "Technical",
    "technicalDescription": "For coding and analytical tasks",
    "educational": "Educational",
    "educationalDescription": "For learning and teaching content",
    "business": "Business",
    "businessDescription": "For professional and marketing content",
    "research": "Research",
    "researchDescription": "For academic and analytical work",
    "storytelling": "Storytelling",
    "storytellingDescription": "For narrative and character development",
    "promptLength": "Prompt Length",
    "short": "Short",
    "shortDescription": "Concise and focused",
    "medium": "Medium",
    "mediumDescription": "Balanced detail level",
    "long": "Long",
    "longDescription": "Comprehensive and detailed",
    "advanced": "Advanced Options",
    "hide": "Hide",
    "show": "Show",
    "targetAudience": "Target Audience",
    "audiencePlaceholder": "Specify your target audience (optional)",
    "tone": "Desired Tone",
    "tonePlaceholder": "Describe the tone you want (optional)",
    "context": "Additional Context",
    "contextPlaceholder": "Add any specific requirements or context (optional)",
    "generating": "Generating your prompt...",
    "generatePrompt": "Generate Prompt",
    "generatedPrompt": "Generated Prompt",
    "copied": "Copied!",
    "copy": "Copy",
    "promptWillAppearHere": "Your enhanced prompt will appear here",
    "getStartedPrompt": "Enter your text and select options to get started",
    "proTips": "✨ Pro Tips",
    "tipBeSpecific": "• Be specific about what you want to achieve",
    "tipIncludeExamples": "• Include examples or references when possible",
    "tipUseContext": "• Add context for better targeted prompts",
    "tipExperiment": "• Experiment with different prompt types and lengths",
    "regenerate": "Regenerate",
    "enhance": "Enhance Further"
  }
};

const locale = 'en-US';
const t = (key: string) => TRANSLATIONS[locale as keyof typeof TRANSLATIONS]?.[key as keyof typeof TRANSLATIONS['en-US']] || TRANSLATIONS['en-US'][key as keyof typeof TRANSLATIONS['en-US']] || key;

export default function PromptGeneratorApp() {
  const [inputText, setInputText] = useState('');
  const [promptType, setPromptType] = useState('creative');
  const [promptLength, setPromptLength] = useState('medium');
  const [targetAudience, setTargetAudience] = useState('');
  const [desiredTone, setDesiredTone] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const promptTypes = [
    { value: 'creative', label: t('creative'), description: t('creativeDescription'), icon: Lightbulb },
    { value: 'technical', label: t('technical'), description: t('technicalDescription'), icon: Zap },
    { value: 'educational', label: t('educational'), description: t('educationalDescription'), icon: Target },
    { value: 'business', label: t('business'), description: t('businessDescription'), icon: Sparkles },
    { value: 'research', label: t('research'), description: t('researchDescription'), icon: RefreshCw },
    { value: 'storytelling', label: t('storytelling'), description: t('storytellingDescription'), icon: Wand2 }
  ];

  const lengthOptions = [
    { value: 'short', label: t('short'), description: t('shortDescription') },
    { value: 'medium', label: t('medium'), description: t('mediumDescription') },
    { value: 'long', label: t('long'), description: t('longDescription') }
  ];

  const formatPromptText = (text: string): string => {
    let formatted = text
      .replace(/\*\s*\n+\s*([^\n*]+:)/g, '**$1**')
      .replace(/\*\s*\n+\s*([^\n*]+)/g, '**$1**')
      .replace(/^\*\s*([^\n*]+:)/gm, '**$1**')
      .replace(/^\*\s*([^\n*]+)/gm, '**$1**')
      .replace(/\*\*([^*]+)\*\*/g, '<h3>$1</h3>')
      .replace(/^\*\s*$/gm, '')
      .replace(/^\s*\*\s*$/gm, '')
      .replace(/(\d+\.)\s+([^\n]+)/g, '<li>$2</li>')
      .replace(/^[\-\*•]\s+([^\n]+)/gm, '<li>$1</li>')
      .replace(/([.!?])\s+([A-Z])/g, '$1<br><br>$2')
      .replace(/\n\s*\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.)/g, '<p>$1')
      .replace(/(.)$/g, '$1</p>')
      .replace(/<\/p><h3>/g, '</p><h3>')
      .replace(/<\/h3><p>/g, '</h3><p>');
    
    formatted = formatted.replace(/(<li>.*?<\/li>)/g, (match) => {
      if (!match.includes('<ul>') && !match.includes('<ol>')) {
        return '<ul>' + match + '</ul>';
      }
      return match;
    });
    
    formatted = formatted
      .replace(/<p>(<ul>|<ol>)/g, '$1')
      .replace(/(<\/ul>|<\/ol>)<\/p>/g, '$1')
      .replace(/<p>\s*<\/p>/g, '')
      .replace(/<p><br><\/p>/g, '')
      .replace(/<br>\s*<h3>/g, '<h3>');
    
    return formatted;
  };

  const generatePrompt = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const audienceContext = targetAudience.trim() ? `\nTarget Audience: ${targetAudience}` : '';
      const toneContext = desiredTone.trim() ? `\nDesired Tone: ${desiredTone}` : '';
      const extraContext = additionalContext.trim() ? `\nAdditional Context: ${additionalContext}` : '';

      const prompt = `You are an expert prompt engineer. Transform the following basic text into a detailed, effective prompt for AI models.

Original Text: "${inputText}"

Requirements:
- Prompt Type: ${promptType} (${promptTypes.find(p => p.value === promptType)?.description})
- Length: ${promptLength} (${lengthOptions.find(l => l.value === promptLength)?.description})${audienceContext}${toneContext}${extraContext}

Instructions:
- Create a clear, specific, and actionable prompt
- Include relevant context and constraints
- Structure the prompt for optimal AI understanding
- Make it engaging and result-oriented
- Add specific formatting instructions if needed
- Include examples or guidance where appropriate

Generate a ${promptLength} ${promptType} prompt that will produce high-quality results when used with AI models.

Respond with ONLY the enhanced prompt. Do not include explanations or additional text.`;

      const response = await generateContent(prompt);
      setGeneratedPrompt(response.trim());
    } catch (error) {
      console.error('Error generating prompt:', error);
      setGeneratedPrompt('Sorry, there was an error generating your prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      generatePrompt();
    }
  };

  const regeneratePrompt = async () => {
    if (generatedPrompt) {
      setIsRegenerating(true);
      try {
        await generatePrompt();
      } finally {
        setIsRegenerating(false);
      }
    }
  };

  const enhancePrompt = async () => {
    if (!generatedPrompt) return;

    setIsEnhancing(true);
    try {
      const enhancePromptText = `Take this existing prompt and enhance it further by adding more detail, specificity, and effectiveness:

"${generatedPrompt}"

Make it more:
- Specific and detailed
- Result-oriented
- Structured for AI understanding
- Include better examples or constraints
- Add formatting requirements if beneficial
- Provide guidance or examples where needed
- Write clear, actionable instructions
- Write the prompt point wise and clearly and use line breaks

Respond with ONLY the enhanced prompt.`;

      const response = await generateContent(enhancePromptText);
      setGeneratedPrompt(response.trim());
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <>
      {!isClient ? (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-pulse">
                <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-4"></div>
                <div className="text-lg font-medium text-gray-600">Loading Prompt Generator...</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Wand2 className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {t('textToPromptGenerator')}
                </h1>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-6">
                <div className={`rounded-xl shadow-lg p-4 lg:p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <h2 className={`text-lg lg:text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('yourText')}</h2>
                  
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={t('textPlaceholder')}
                    suppressHydrationWarning={true}
                    className={`w-full h-40 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      isDarkMode 
                        ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  
                  <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('tipKeyboardShortcut')}
                  </div>
                </div>

                <div className={`rounded-xl shadow-lg p-4 lg:p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <h2 className={`text-lg lg:text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('promptType')}</h2>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {promptTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setPromptType(type.value)}
                          className={`p-4 rounded-lg border-2 transition-colors text-left ${
                            promptType === type.value
                              ? isDarkMode 
                                ? 'border-purple-400 bg-purple-900/30' 
                                : 'border-purple-500 bg-purple-50'
                              : isDarkMode 
                                ? 'border-slate-600 bg-slate-700 hover:border-slate-500' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                            <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{type.label}</div>
                          </div>
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{type.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={`rounded-xl shadow-lg p-4 lg:p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <h2 className={`text-lg lg:text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('promptLength')}</h2>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {lengthOptions.map((length) => (
                      <button
                        key={length.value}
                        onClick={() => setPromptLength(length.value)}
                        className={`p-4 rounded-lg border-2 transition-colors text-center ${
                          promptLength === length.value
                            ? isDarkMode 
                              ? 'border-purple-400 bg-purple-900/30' 
                              : 'border-purple-500 bg-purple-50'
                            : isDarkMode 
                              ? 'border-slate-600 bg-slate-700 hover:border-slate-500' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{length.label}</div>
                        <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{length.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`rounded-xl shadow-lg p-4 lg:p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg lg:text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('advanced')}</h2>
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className={`font-medium transition-colors ${
                        isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                      }`}
                    >
                      {showAdvanced ? t('hide') : t('show')}
                    </button>
                  </div>
                  
                  {showAdvanced && (
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t('targetAudience')}
                        </label>
                        <input
                          type="text"
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          placeholder={t('audiencePlaceholder')}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                            isDarkMode 
                              ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t('tone')}
                        </label>
                        <input
                          type="text"
                          value={desiredTone}
                          onChange={(e) => setDesiredTone(e.target.value)}
                          placeholder={t('tonePlaceholder')}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                            isDarkMode 
                              ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t('context')}
                        </label>
                        <textarea
                          value={additionalContext}
                          onChange={(e) => setAdditionalContext(e.target.value)}
                          placeholder={t('contextPlaceholder')}
                          className={`w-full h-24 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                            isDarkMode 
                              ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={generatePrompt}
                  disabled={isLoading || !inputText.trim()}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                    isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-gray-100' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      {t('generatePrompt')}
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div className={`rounded-xl shadow-lg p-4 lg:p-6 min-h-96 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg lg:text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('generatedPrompt')}</h2>
                    
                    <div className="flex items-center gap-2">
                      {generatedPrompt && (
                        <>
                          <button
                            onClick={regeneratePrompt}
                            disabled={isLoading || isRegenerating || isEnhancing}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                              isDarkMode 
                                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {isRegenerating ? (
                              <>
                                <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                                Regenerating...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-4 h-4" />
                                {t('regenerate')}
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={enhancePrompt}
                            disabled={isLoading || isRegenerating || isEnhancing}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                              isDarkMode 
                                ? 'bg-purple-700 hover:bg-purple-600 text-purple-200' 
                                : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                            }`}
                          >
                            {isEnhancing ? (
                              <>
                                <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
                                  isDarkMode ? 'border-purple-300/30 border-t-purple-300' : 'border-purple-600/30 border-t-purple-600'
                                }`}></div>
                                Enhancing...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                {t('enhance')}
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={copyToClipboard}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium ${
                              isDarkMode 
                                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {copied ? (
                              <>
                                <Check className="w-4 h-4 text-green-600" />
                                {t('copied')}
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                {t('copy')}
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {generatedPrompt ? (
                    <div className={`rounded-lg p-4 border ${
                      isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div 
                        className={`font-sans leading-relaxed break-words ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        } [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:first:mt-0 ${
                          isDarkMode ? '[&>h3]:text-purple-400' : '[&>h3]:text-purple-600'
                        } [&>p]:mb-4 [&>p]:leading-7 [&>ul]:mb-4 [&>ul]:ml-4 [&>li]:mb-2 [&>li]:leading-6 [&>ol]:mb-4 [&>ol]:ml-4`}
                        suppressHydrationWarning={true}
                        dangerouslySetInnerHTML={{
                          __html: formatPromptText(generatedPrompt)
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`flex flex-col items-center justify-center h-64 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Wand2 className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-lg">{t('promptWillAppearHere')}</p>
                      <p className="text-sm mt-2">{t('getStartedPrompt')}</p>
                    </div>
                  )}
                </div>

                <div className={`rounded-lg p-4 border ${
                  isDarkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-100'
                }`}>
                  <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('proTips')}</h3>
                  <ul className={`text-sm space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>{t('tipBeSpecific')}</li>
                    <li>{t('tipIncludeExamples')}</li>
                    <li>{t('tipUseContext')}</li>
                    <li>{t('tipExperiment')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}