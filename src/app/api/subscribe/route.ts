import { Resend } from "resend";
import { NextResponse } from "next/server";

const VALID_ROLES = ["owner", "ops", "other"] as const;
const VALID_PAINS = [
  "disconnected",
  "hired_still_drowning",
  "growth",
  "key_person",
  "incident",
  "other",
] as const;

const ROLE_LABELS: Record<(typeof VALID_ROLES)[number], string> = {
  owner: "Dueño / Socio",
  ops: "Ops / Admin",
  other: "Otro",
};

const PAIN_LABELS: Record<(typeof VALID_PAINS)[number], string> = {
  disconnected: "Herramientas que no hablan entre sí",
  hired_still_drowning: "Contraté ops y seguimos ahogados",
  growth: "Crecimos y los procesos no aguantaron",
  key_person: "Alguien clave se fue y todo se detuvo",
  incident: "Incidente por proceso manual",
  other: "Otro",
};

function escapeHtml(text: unknown): string {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildNotificationHtml({
  name,
  email,
  company,
  phone,
  role,
  pain,
  tools,
  message,
}: {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  role?: string;
  pain?: string;
  tools?: string;
  message?: string;
}) {
  const roleLabel =
    role && VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])
      ? ROLE_LABELS[role as (typeof VALID_ROLES)[number]]
      : role;
  const painLabel =
    pain && VALID_PAINS.includes(pain as (typeof VALID_PAINS)[number])
      ? PAIN_LABELS[pain as (typeof VALID_PAINS)[number]]
      : pain;

  const rows = [
    ["Nombre", name],
    ["Email", email],
    ["Empresa", company],
    ["Teléfono", phone],
    ["Rol", roleLabel],
    ["Motivo", painLabel],
    ["Herramientas", tools],
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
    const { name, email, company, phone, role, pain, tools, message } =
      await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    if (!company?.trim()) {
      return NextResponse.json(
        { message: "Company is required" },
        { status: 400 },
      );
    }

    if (!role || !VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { message: "Valid role is required" },
        { status: 400 },
      );
    }

    if (!pain || !VALID_PAINS.includes(pain)) {
      return NextResponse.json(
        { message: "Valid pain/trigger is required" },
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
    const firstName = name?.split(" ")[0] || "";
    const lastName = name?.split(" ").slice(1).join(" ") || "";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Breakaway <onboarding@resend.dev>";
    const notificationEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || "general@breakaway.work";

    if (process.env.RESEND_SEGMENT_ID) {
      const { error: contactError } = await resend.contacts.create({
        audienceId: process.env.RESEND_SEGMENT_ID,
        email,
        firstName,
        lastName,
        unsubscribed: false,
      });

      if (contactError) {
        console.warn("Resend contact warning:", contactError);
      }
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: [notificationEmail],
      replyTo: email,
      subject: `Nuevo contacto: ${name || email} (${company})`,
      html: buildNotificationHtml({
        name,
        email,
        company,
        phone,
        role,
        pain,
        tools,
        message,
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
