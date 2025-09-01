'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Offline Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur opacity-50"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <WifiOff className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            You're Offline
          </h1>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            It looks like you've lost your internet connection. Don't worry - you can still use the app with previously loaded content.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              💡 Offline Tips
            </h3>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 text-left">
              <li>• Previously translated code is still available</li>
              <li>• Check your internet connection</li>
              <li>• Try refreshing the page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
