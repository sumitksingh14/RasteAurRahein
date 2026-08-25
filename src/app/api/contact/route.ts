import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subjectLabel = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "General Inquiry";

    const { error } = await resend.emails.send({
      from: "RasteAurRahein Contact <onboarding@resend.dev>",
      to: ["zsumitksingh@gmail.com"],
      replyTo: email,
      subject: `[Contact] ${subjectLabel} — message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subjectLabel}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#c9a84c;margin-bottom:4px">New Contact Message</h2>
          <p style="color:#888;font-size:13px;margin-top:0">Submitted via RasteAurRahein contact form</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <table style="width:100%;font-size:14px;color:#333">
            <tr><td style="padding:6px 0;font-weight:600;width:80px">Name</td><td>${name}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 0;font-weight:600">Subject</td><td>${subjectLabel}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <div style="background:#fafafa;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;white-space:pre-wrap;color:#333">${message}</div>
          <p style="color:#aaa;font-size:12px;margin-top:24px">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

