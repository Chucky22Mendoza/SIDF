import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";
import { resendApiKey } from '@/config/config';

export async function POST(request: NextRequest) {
  const {
    name,
    mail,
    message,
  } = await request.json();

  try {
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: mail,
      to: 'loginlock22@gmail.com',
      subject: `AHEC contacto mandado por ${name}`,
      html: `
        <h1>Recibiste un mensaje de la página web SIDF</h1>
        <br /><br />
        <p>
          <strong>${message}</strong>
        </p>
      `
    });

    if (error) {
      return NextResponse.json(error, { status: 403 });
    }

    return NextResponse.json({
      message: 'Mensaje enviado con éxito',
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}