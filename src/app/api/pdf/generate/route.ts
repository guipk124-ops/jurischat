import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { generateCaseSummary } from '@/lib/ai';
import { generateCasePdf } from '@/lib/pdf';

export async function POST(req: NextRequest) {
  try {
    const { caseId } = await req.json();

    if (!caseId) {
      return NextResponse.json(
        { error: 'caseId is required' },
        { status: 400 }
      );
    }

    // Fetch case and chat history
    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
      include: { chats: true },
    });

    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }

    // Generate summary from AI
    const chatHistory = caseData.chats.map((chat) => ({
      message: chat.message,
      response: chat.response || '',
    }));

    const summary = await generateCaseSummary(
      caseData.clientData || {},
      chatHistory
    );

    // Generate PDF
    const pdfBuffer = await generateCasePdf({
      caseId: caseData.id,
      title: caseData.title,
      clientData: (caseData.clientData as Record<string, any>) || {},
      chatHistory: caseData.chats.map((c) => ({
        id: c.id,
        caseId: c.caseId,
        userId: c.userId,
        message: c.message,
        response: c.response || '',
        role: c.role,
        createdAt: c.createdAt,
      })),
      summary,
      recommendations: [
        'Revisar toda a documentação fornecida',
        'Agendar consulta presencial se necessário',
        'Preparar estratégia legal baseada nos fatos coletados',
      ],
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="caso_${caseId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
