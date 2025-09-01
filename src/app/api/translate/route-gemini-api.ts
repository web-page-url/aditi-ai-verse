// GROQ SDK (commented out - service not available)
// import { Groq } from 'groq-sdk';
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { code, fromLanguage, toLanguage } = await request.json();

    if (!code || !fromLanguage || !toLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // GROQ implementation (commented out - service not available)
    /*
    const prompt = `Translate the following ${fromLanguage} code to ${toLanguage}.
    Only return the translated code without any explanations or markdown formatting:

    ${code}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.1,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    const translatedCode = chatCompletion.choices[0]?.message?.content || '';
    */

    // Gemini implementation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Translate the following ${fromLanguage} code to ${toLanguage}.

    Requirements:
    - Only return the translated code without any explanations
    - Do not include markdown formatting or code blocks
    - Maintain the same functionality and logic
    - Use best practices for the target language
    - Preserve comments if they exist

    Source code:
    ${code}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const translatedCode = response.text();

    return NextResponse.json({ translatedCode });
  } catch (error) {
    console.error('Translation error:', error);

    // Check if it's a network error
    const isNetworkError = error instanceof Error &&
      (error.message.includes('fetch') || error.message.includes('network'));

    return NextResponse.json(
      {
        error: isNetworkError
          ? 'Network error. Please check your connection and try again.'
          : 'Failed to translate code. Please try again.',
        isNetworkError
      },
      { status: isNetworkError ? 503 : 500 }
    );
  }
}



