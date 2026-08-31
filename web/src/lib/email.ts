import nodemailer from "nodemailer";

export interface ApplicationEmailPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  role: string;
  profile: string;
  resumeBuffer: Buffer;
  resumeFileName: string;
}

export async function sendApplicationEmail(payload: ApplicationEmailPayload): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const hrEmail = process.env.HR_EMAIL || process.env.SMTP_USER || "careers@futeservices.com";

  if (!smtpUser || !smtpPass) {
    console.warn(
      `[Email Warning] SMTP_USER or SMTP_PASS not set in environment variables. Candidate email alert for ${payload.name} was logged to console instead.`
    );
    console.log(`[New Application Alert for HR]:
- Candidate: ${payload.name} (${payload.email})
- Phone: ${payload.phone}
- Location: ${payload.location}
- Department: ${payload.department}
- Role: ${payload.role || "General Application"}
- Profile Summary: ${payload.profile}
- Resume Attachment: ${payload.resumeFileName}
    `);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formattedRole = payload.role || "General Application";

    // 1. Email to HR Team
    await transporter.sendMail({
      from: `"Futé Services Careers" <${smtpUser}>`,
      to: hrEmail,
      replyTo: payload.email,
      subject: `🎯 New Job Application: ${payload.name} - ${formattedRole} (${payload.department})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; color: #111827;">
          <div style="background-color: #800913; padding: 24px; text-align: left; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Futé Services · New Candidate Application</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #fecdd3;">A new applicant has submitted their details for review.</p>
          </div>

          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; width: 140px;">Candidate Name:</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111827;">${payload.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Email Address:</td>
                <td style="padding: 10px 0;"><a href="mailto:${payload.email}" style="color: #800913; text-decoration: none; font-weight: 500;">${payload.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Mobile Number:</td>
                <td style="padding: 10px 0; color: #111827;"><a href="tel:${payload.phone}" style="color: #111827; text-decoration: none;">${payload.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Current Location:</td>
                <td style="padding: 10px 0; color: #111827;">${payload.location}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Department:</td>
                <td style="padding: 10px 0; color: #111827;"><span style="background: #fdf2f4; color: #800913; padding: 3px 8px; border-radius: 6px; font-weight: 600; font-size: 12px;">${payload.department}</span></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Applied Role:</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 600;">${formattedRole}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Attached Résumé:</td>
                <td style="padding: 10px 0; color: #111827;">📎 <strong>${payload.resumeFileName}</strong> (Attached)</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Work Profile & Experience:</h3>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${payload.profile}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center;">
              <a href="mailto:${payload.email}?subject=Regarding your application at Futé Services for ${formattedRole}" style="display: inline-block; background-color: #800913; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 6px;">Reply to Candidate →</a>
            </div>
          </div>

          <div style="background-color: #fafafa; padding: 14px 24px; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
            Futé Services Careers Portal · Automatic Notification
          </div>
        </div>
      `,
      attachments: [
        {
          filename: payload.resumeFileName,
          content: payload.resumeBuffer,
        },
      ],
    });

    console.log(`[Email] HR notification sent successfully to ${hrEmail} for candidate ${payload.name}`);
    return true;
  } catch (error) {
    console.error("[Email Error] Failed to send email alert to HR:", error);
    return false;
  }
}
