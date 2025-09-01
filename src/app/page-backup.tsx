'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CodeEditor } from '@/components/CodeEditor';
// import PWAInstallPrompt from '@/components/PWAInstallPrompt';
// import OfflineIndicator from '@/components/OfflineIndicator';
import { SupportedLanguage } from '@/lib/utils';
import { Code2, Sparkles, Zap, RefreshCw } from 'lucide-react';

export default function Home() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [fromLanguage, setFromLanguage] = useState<SupportedLanguage>('python');
  const [toLanguage, setToLanguage] = useState<SupportedLanguage>('javascript');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputCode.trim()) {
      setError('Please enter some code to translate');
      return;
    }

    setIsTranslating(true);
    setError('');
    setOutputCode('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: inputCode,
          fromLanguage,
          toLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setOutputCode(data.translatedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputCode(outputCode);
    setOutputCode(inputCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Code Translator
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">AI-powered code transformation</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Powered by AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in" aria-labelledby="hero-heading">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-800/20 px-6 py-3 rounded-full mb-8 shadow-lg">
            <div className="relative">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur opacity-30 animate-ping"></div>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Next-Gen AI Translation
            </span>
          </div>
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
              Transform Code
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
              Effortlessly
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Convert between <span className="font-semibold text-blue-600 dark:text-blue-400">9 programming languages</span> with
            <span className="font-semibold text-purple-600 dark:text-purple-400"> AI precision</span> and
            <span className="font-semibold text-cyan-600 dark:text-cyan-400"> lightning speed</span>
          </p>
        </section>

        {/* Translation Interface */}
        <section className="max-w-7xl mx-auto" aria-labelledby="translator-heading">
          <h2 id="translator-heading" className="sr-only">Code Translation Tool</h2>
          <div className="relative">
            {/* Glass Card Container */}
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Source Code</h3>
                  </div>
                  <LanguageSelector
                    value={fromLanguage}
                    onChange={setFromLanguage}
                    label="From"
                  />
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CodeEditor
                      value={inputCode}
                      onChange={setInputCode}
                      placeholder="✨ Paste your code here and watch the magic happen..."
                    />
                  </div>
                </div>

                {/* Swap Button - Centered */}
                <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10 flex justify-center lg:justify-start">
                  <Button
                    onClick={swapLanguages}
                    variant="outline"
                    size="lg"
                    className="bg-white/30 dark:bg-black/30 backdrop-blur-sm border-white/20 hover:bg-white/40 dark:hover:bg-black/40 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="sr-only">Swap languages</span>
                  </Button>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Translated Code</h3>
                  </div>
                  <LanguageSelector
                    value={toLanguage}
                    onChange={setToLanguage}
                    label="To"
                  />
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CodeEditor
                      value={outputCode}
                      placeholder="🚀 Your translated code will appear here..."
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  onClick={handleTranslate}
                  loading={isTranslating}
                  size="lg"
                  className="relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Zap className="mr-3 h-5 w-5" />
                    {isTranslating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Translating...
                      </>
                    ) : (
                      'Transform Code'
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <section className="max-w-6xl mx-auto mt-20" aria-labelledby="features-heading">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-4">
              Why Choose Our Translator?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Experience the future of code translation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center p-8 bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-3xl hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur opacity-50"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">Get instant translations powered by cutting-edge AI technology</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center p-8 bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-3xl hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-50"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Code2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">9 Languages</h3>
                <p className="text-slate-600 dark:text-slate-400">Support for all major programming languages and frameworks</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center p-8 bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-3xl hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl blur opacity-50"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Smart Translation</h3>
                <p className="text-slate-600 dark:text-slate-400">Maintains logic, structure, and best practices across languages</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Created with ❤️ by{' '}
                <a
                  href="https://www.linkedin.com/in/anubhav-chaudhary-4bba7918b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 inline-block cursor-pointer"
                >
                  Anubhav
                </a>
              </p>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse delay-500"></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              © 2025 Code Translator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      {/* <PWAInstallPrompt /> */}

      {/* Offline Indicator */}
      {/* <OfflineIndicator /> */}
    </div>
  );
}