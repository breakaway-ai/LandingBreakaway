import { Resend } from 'resend';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildNotificationHtml({ name, email, company, phone, message }) {
  const rows = [
    ['Nombre', name],
    ['Email', email],
    ['Empresa', company],
    ['Teléfono', phone],
    ['Mensaje', message],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#111;">Nuevo mensaje desde el formulario de contacto</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
        ${rows}
      </table>
    </div>
  `;
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Email service not configured' }),
    };
  }

  try {
    const { name, email, company, phone, message } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    const resend = new Resend(apiKey);
    const firstName = name?.split(' ')[0] || '';
    const lastName = name?.split(' ').slice(1).join(' ') || '';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Breakaway <onboarding@resend.dev>';
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'general@breakaway.work';

    const contactPayload = {
      email,
      firstName,
      lastName,
      unsubscribed: false,
      properties: {
        company: company || '',
        phone: phone || '',
        message: message || '',
      },
    };

    if (process.env.RESEND_SEGMENT_ID) {
      contactPayload.segments = [{ id: process.env.RESEND_SEGMENT_ID }];
    }

    const { error: contactError } = await resend.contacts.create(contactPayload);
    if (contactError) {
      console.warn('Resend contact warning:', contactError);
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: [notificationEmail],
      replyTo: email,
      subject: `Nuevo contacto: ${name || email}`,
      html: buildNotificationHtml({ name, email, company, phone, message }),
    });

    if (emailError) {
      console.error('Resend email error:', emailError);
      return {
        statusCode: emailError.statusCode || 500,
        headers,
        body: JSON.stringify({
          message: emailError.message || 'Error submitting the form',
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Contact form submitted successfully!',
        emailId: emailData?.id,
      }),
    };
  } catch (error) {
    console.error('Subscribe error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: error.message || 'Error submitting the form',
      }),
    };
  }
};
