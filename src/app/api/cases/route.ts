import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { userId, legalArea, title } = await req.json();

    if (!userId || !legalArea) {
      return NextResponse.json(
        { error: 'userId and legalArea are required' },
        { status: 400 }
      );
    }

    const newCase = await prisma.case.create({
      data: {
        id: uuidv4(),
        userId,
        legalArea,
        title: title || `Caso - ${legalArea}`,
        status: 'OPEN',
        priority: 'MEDIUM',
      },
    });

    return NextResponse.json(
      { success: true, data: newCase },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const status = req.nextUrl.searchParams.get('status');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const where: any = { userId };
    if (status) where.status = status;

    const cases = await prisma.case.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: cases,
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}
