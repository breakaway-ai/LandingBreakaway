import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(text: unknown): string {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildNotificationHtml({
  name,
  company,
  whatsapp,
  message,
}: {
  name: string;
  company?: string;
  whatsapp: string;
  message: string;
}) {
  const rows = [
    ["Nombre", name],
    ["Empresa", company],
    ["WhatsApp", whatsapp],
    ["Mensaje", message],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#111;">Nuevo mensaje desde el formulario de contacto</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
        ${rows}
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const { name, company, whatsapp, message } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    if (!whatsapp?.trim()) {
      return NextResponse.json(
        { message: "WhatsApp is required" },
        { status: 400 },
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "Email service not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Breakaway <onboarding@resend.dev>";
    const notificationEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || "general@breakaway.work";

    const subjectCompany = company?.trim() || "Sin empresa";
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: [notificationEmail],
      subject: `Nuevo contacto: ${name.trim()} (${subjectCompany})`,
      html: buildNotificationHtml({
        name: name.trim(),
        company: company?.trim(),
        whatsapp: whatsapp.trim(),
        message: message.trim(),
      }),
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json(
        {
          message: emailError.message || "Error submitting the form",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Contact form submitted successfully!",
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Error submitting the form",
      },
      { status: 500 },
    );
  }
}
