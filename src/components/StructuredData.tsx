export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://aditi-ai-verse.vercel.app/#website",
        "url": "https://aditi-ai-verse.vercel.app",
        "name": "Code Translator",
        "description": "AI-Powered Code Translation Tool - Transform code between 9 programming languages instantly",
        "publisher": {
          "@id": "https://aditi-ai-verse.vercel.app/#person"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://aditi-ai-verse.vercel.app/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://aditi-ai-verse.vercel.app/#webpage",
        "url": "https://aditi-ai-verse.vercel.app",
        "name": "Code Translator - AI-Powered Code Translation Tool",
        "isPartOf": {
          "@id": "https://aditi-ai-verse.vercel.app/#website"
        },
        "about": {
          "@id": "https://aditi-ai-verse.vercel.app/#person"
        },
        "description": "Transform code between 9 programming languages instantly with AI precision. Convert C, C++, Python, Java, JavaScript, TypeScript, Ruby, PHP, and Rust code effortlessly.",
        "breadcrumb": {
          "@id": "https://aditi-ai-verse.vercel.app/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://aditi-ai-verse.vercel.app/#person",
        "name": "Anubhav",
        "jobTitle": "Software Developer",
        "description": "Creator of Code Translator - AI-powered code translation tool",
        "url": "https://aditi-ai-verse.vercel.app",
        "sameAs": [
          "https://www.linkedin.com/in/anubhav-chaudhary-4bba7918b/",
          "https://github.com/anubhav"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://aditi-ai-verse.vercel.app/#software",
        "name": "Code Translator",
        "description": "AI-Powered Code Translation Tool that converts code between 9 programming languages",
        "url": "https://aditi-ai-verse.vercel.app",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@id": "https://aditi-ai-verse.vercel.app/#person"
        },
        "featureList": [
          "AI-powered code translation",
          "Support for 9 programming languages",
          "Real-time code conversion",
          "Modern glassmorphism UI",
          "Copy and share functionality",
          "Responsive design"
        ],
        "screenshot": "https://aditi-ai-verse.vercel.app/aditi-blue-logo-1.png"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://aditi-ai-verse.vercel.app/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aditi-ai-verse.vercel.app"
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