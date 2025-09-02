// GROQ SDK (commented out - service not available)
// import { Groq } from 'groq-sdk';
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });


//----------------------------------------------------------------------
// This is the OpenAI implementation

//----------------------------------------------------------------------


import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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

    // OpenAI implementation
    const prompt = `Translate the following ${fromLanguage} code to ${toLanguage}.

    Requirements:
    - Only return the translated code without any explanations
    - Write all Code needed for the target language
    - Do not include markdown formatting or code blocks
    - Maintain the same functionality and logic
    - Use best practices for the target language
    - Preserve comments if they exist

    Source code:
    ${code}`;


    //gpt-3.5-turbo
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //  // model: "gpt-5-nano",
    //   //stream: false,
    //   messages: [
    //     {
    //       role: "user",
    //       content: prompt
    //     }
    //   ],
    //   temperature: 0.1,
    //   max_tokens: 2048,
    // });


    //GPT-5-Nano

const completion = await openai.chat.completions.create({
  model: "gpt-5-nano",
  messages: [
    {
      role: "user",
      content: prompt
    }
  ],
  max_completion_tokens: 2048    // ✅ Keep only this
});



    const translatedCode = completion.choices[0]?.message?.content || '';

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



