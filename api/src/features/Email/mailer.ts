import nodemailer, { Transporter } from "nodemailer";

const {
  MAIL_HOST = "sandbox.smtp.mailtrap.io",
  MAIL_PORT = "587",
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM_NAME = "My App",
  MAIL_FROM_EMAIL = "no-reply@myapp.local",
} = process.env;

if (!MAIL_USER || !MAIL_PASS) {
  // Fail fast if creds are missing
  console.warn("[mail] Missing MAIL_USER/MAIL_PASS envs.");
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
  const info = await mailer.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
  // Nodemailer returns a messageId you can log for debugging
  console.log("[mail] sent:", info.messageId);
  return info;
}
