import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Code Translator - AI-Powered Code Translation Tool',
    short_name: 'Code Translator',
    description: 'Transform code between 9 programming languages instantly with AI precision. Convert C, C++, Python, Java, JavaScript, TypeScript, Ruby, PHP, and Rust code effortlessly.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#3b82f6',
    scope: '/',
    orientation: 'portrait-primary',
    categories: ['developer', 'productivity', 'utilities', 'education'],
    lang: 'en',
    dir: 'ltr',
    prefer_related_applications: false,
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any'
      },
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
        purpose: 'any'
      },
    ],
    screenshots: [
      {
        src: '/code-translates-2.0.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
        form_factor: 'wide',
        label: 'Code Translator - Main Interface'
      }
    ],
    shortcuts: [
      {
        name: 'Translate Code',
        short_name: 'Translate',
        description: 'Start translating code between languages',
        url: '/',
        icons: [
          {
            src: '/icon',
            sizes: '32x32',
            type: 'image/png'
          }
        ]
      }
    ],
    related_applications: []
  }
}
