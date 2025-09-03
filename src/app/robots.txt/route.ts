export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://aditi-ai-verse.vercel.app/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}