export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request?.json?.() ?? {};
    
    const { name, email, phone, subject, message } = data ?? {};

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Por favor completa todos los campos requeridos.' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await prisma?.contact?.create?.({
      data: {
        name: name ?? '',
        email: email ?? '',
        phone: phone ?? '',
        subject: subject ?? '',
        message: message ?? '',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente.',
      id: contact?.id ?? '',
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar el mensaje.' },
      { status: 500 }
    );
  }
}
