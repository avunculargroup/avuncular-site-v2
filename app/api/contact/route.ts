import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(5),
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { name, email, subject, message } = schema.parse(payload);

    const apiKey = process.env.MAILJET_API_KEY;
    const apiSecret = process.env.MAILJET_API_SECRET;
    const fromEmail = process.env.MAILJET_FROM_EMAIL;
    const fromName = process.env.MAILJET_FROM_NAME ?? "Avuncular Group";

    if (!apiKey || !apiSecret || !fromEmail) {
      console.error("Mailjet env vars missing");
      return NextResponse.json(
        { error: "Email configuration missing" },
        { status: 500 }
      );
    }

    const sanitizedMessage = message.replace(/\n/g, "<br />");

    const mailjetPayload = {
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: "info@avunculargroup.com", Name: "Avuncular Group" }],
          Subject: `[Website] ${subject}`,
          HTMLPart: `
            <p>New message from ${name} (${email})</p>
            <p>${sanitizedMessage}</p>
          `,
        },
        {
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: email, Name: name }],
          Subject: "We received your message",
          HTMLPart: `
            <p>Hi ${name},</p>
            <p>Thanks for reaching out to Avuncular Group. Here's what you sent:</p>
            <p>${sanitizedMessage}</p>
            <p>We’ll reply shortly.</p>
          `,
        },
      ],
    };

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailjetPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Mailjet error", response.status, errorBody);
      throw new Error("Mailjet request failed");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    const status = error instanceof z.ZodError ? 400 : 500;
    return NextResponse.json(
      { error: "Unable to send message" },
      { status }
    );
  }
}
