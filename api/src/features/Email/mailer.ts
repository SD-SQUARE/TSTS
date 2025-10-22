import nodemailer, { Transporter } from "nodemailer";
import logger from "../../utils/logger.js";

const {
  MAIL_HOST = "sandbox.smtp.mailtrap.io",
  MAIL_PORT = "587",
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM_NAME = "My App",
  MAIL_FROM_EMAIL = "no-reply@myapp.local",
} = process.env;

if (!MAIL_USER || !MAIL_PASS) {
  logger.warn("[mail] Missing MAIL_USER/MAIL_PASS environment variables.");
}

export const mailer: Transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  secure: false, // Mailtrap works with 587 & STARTTLS
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  fromName?: string;
  fromEmail?: string;
}) {
  const from = `"${opts.fromName ?? MAIL_FROM_NAME}" <${opts.fromEmail ?? MAIL_FROM_EMAIL}>`;

  try {
    logger.info(
      `[mail] Sending email to: ${opts.to} | Subject: "${opts.subject}"`
    );

    const info = await mailer.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });

    logger.info(
      `[mail] Email sent successfully | Message ID: ${info.messageId}`
    );
    logger.debug(`[mail] Full response: ${JSON.stringify(info, null, 2)}`);

    return info;
  } catch (error: any) {
    logger.error(
      `[mail] Failed to send email to ${opts.to}: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    throw error;
  }
}
