import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In production: forward to Resend/Formspree/SendGrid
    // For now, log to console (replace with your email service)
    console.log("Contact form submission:", { name, email, subject, message });

    // Example Resend integration (uncomment when API key is configured):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@wanderlustchronicles.com",
    //   to: "hello@wanderlustchronicles.com",
    //   subject: `[Contact] ${subject || "New message"} from ${name}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
