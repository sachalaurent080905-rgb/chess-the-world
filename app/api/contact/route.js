import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, subject, message, phone } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    // Log the contact form submission
    console.log('[CONTACT FORM]', { name, email, subject, phone });
    console.log('[CONTACT MESSAGE]', message);

    // ── Option 1: Resend email service (recommended) ──────────────────────
    // Uncomment and configure if you have a Resend API key
    /*
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'Chess The World <contact@chesstheworld.fr>',
        to: process.env.CONTACT_EMAIL || 'chesstheworld.contact@gmail.com',
        subject: `[CTW] ${subject || 'Nouveau message'} – ${name}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
          ${subject ? `<p><strong>Sujet:</strong> ${subject}</p>` : ''}
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: email,
      });
    }
    */

    // ── Option 2: Nodemailer (requires SMTP config) ───────────────────────
    // See: https://nodemailer.com/about/

    // For now, we return success and log to console
    // In production, integrate your preferred email service

    return NextResponse.json({
      success: true,
      message: 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
    });
  } catch (error) {
    console.error('[CONTACT ERROR]', error.message);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
