export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://code-translates.vercel.app/#website",
        "url": "https://code-translates.vercel.app",
        "name": "Code Translator",
        "description": "AI-Powered Code Translation Tool - Transform code between 9 programming languages instantly",
        "publisher": {
          "@id": "https://code-translates.vercel.app/#person"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://code-translates.vercel.app/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://code-translates.vercel.app/#webpage",
        "url": "https://code-translates.vercel.app",
        "name": "Code Translator - AI-Powered Code Translation Tool",
        "isPartOf": {
          "@id": "https://code-translates.vercel.app/#website"
        },
        "about": {
          "@id": "https://code-translates.vercel.app/#person"
        },
        "description": "Transform code between 9 programming languages instantly with AI precision. Convert C, C++, Python, Java, JavaScript, TypeScript, Ruby, PHP, and Rust code effortlessly.",
        "breadcrumb": {
          "@id": "https://code-translates.vercel.app/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://code-translates.vercel.app/#person",
        "name": "Anubhav",
        "jobTitle": "Software Developer",
        "description": "Creator of Code Translator - AI-powered code translation tool",
        "url": "https://code-translates.vercel.app",
        "sameAs": [
          "https://www.linkedin.com/in/anubhav-chaudhary-4bba7918b/",
          "https://github.com/anubhav"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://code-translates.vercel.app/#software",
        "name": "Code Translator",
        "description": "AI-Powered Code Translation Tool that converts code between 9 programming languages",
        "url": "https://code-translates.vercel.app",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@id": "https://code-translates.vercel.app/#person"
        },
        "featureList": [
          "AI-powered code translation",
          "Support for 9 programming languages",
          "Real-time code conversion",
          "Modern glassmorphism UI",
          "Copy and share functionality",
          "Responsive design"
        ],
        "screenshot": "https://code-translates.vercel.app/code-translates-2.0.jpg"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://code-translates.vercel.app/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://code-translates.vercel.app"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
