import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { message, legalArea, conversationHistory = [] } = await req.json();

    if (!message || !legalArea) {
      return NextResponse.json(
        { error: 'Message and legalArea are required' },
        { status: 400 }
      );
    }

    const response = await generateChatResponse(
      message,
      legalArea,
      conversationHistory
    );

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
