export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request?.json?.() ?? {};
    
    const { name, email, phone, service, preferredDate, preferredTime, message } = data ?? {};

    // Validate required fields
    if (!name || !email || !phone || !service || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, message: 'Por favor completa todos los campos requeridos.' },
        { status: 400 }
      );
    }

    // Save to database
    const appointment = await prisma?.appointment?.create?.({
      data: {
        name: name ?? '',
        email: email ?? '',
        phone: phone ?? '',
        service: service ?? '',
        preferredDate: preferredDate ?? '',
        preferredTime: preferredTime ?? '',
        message: message ?? '',
        status: 'pending',
      },
    });

    // Send email notification
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #faf8f5; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #a68a64; border-bottom: 2px solid #86efac; padding-bottom: 15px; margin-top: 0;">
            \uD83D\uDCC5 Nueva Solicitud de Cita
          </h2>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5a9a5a;">
            <p style="margin: 8px 0; color: #3d3d3d;"><strong>Nombre:</strong> ${name ?? ''}</p>
            <p style="margin: 8px 0; color: #3d3d3d;"><strong>Email:</strong> <a href="mailto:${email ?? ''}" style="color: #5a9a5a;">${email ?? ''}</a></p>
            <p style="margin: 8px 0; color: #3d3d3d;"><strong>Teléfono:</strong> ${phone ?? ''}</p>
            <p style="margin: 8px 0; color: #3d3d3d;"><strong>Servicio:</strong> ${service ?? ''}</p>
            <p style="margin: 8px 0; color: #3d3d3d;"><strong>Fecha preferida:</strong> ${preferredDate ?? ''}</p>
            <p style="margin: 8px 0; color: #3d3d3d;"><strong>Hora preferida:</strong> ${preferredTime ?? ''}</p>
          </div>
          
          ${message ? `
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #ebe3d5;">
            <p style="margin: 0 0 10px 0; color: #a68a64; font-weight: bold;">Motivo de consulta:</p>
            <p style="margin: 0; color: #3d3d3d; line-height: 1.6;">${message}</p>
          </div>
          ` : ''}
          
          <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #ebe3d5; padding-top: 15px;">
            Recibido el: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
          </p>
        </div>
      </div>
    `;

    try {
      const appUrl = process.env.NEXTAUTH_URL ?? '';
      const appName = 'APSID & MANAOCA';
      
      const emailResponse = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY ?? '',
          app_id: process.env.WEB_APP_ID ?? '',
          notification_id: process.env.NOTIF_ID_NUEVA_SOLICITUD_DE_CITA ?? '',
          subject: `Nueva solicitud de cita de ${name ?? 'Cliente'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'olga@psicologa-olga.com',
          sender_email: appUrl ? `noreply@${new URL(appUrl).hostname}` : 'noreply@mail.abacusai.app',
          sender_alias: appName,
        }),
      });

      const emailResult = await emailResponse?.json?.();
      if (!emailResult?.success && !emailResult?.notification_disabled) {
        console.error('Email notification failed:', emailResult);
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud de cita enviada correctamente.',
      id: appointment?.id ?? '',
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
