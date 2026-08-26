import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send a welcome / confirmation email to the subscriber
    const { error: subscriberError } = await resend.emails.send({
      from: "Raste Aur Raahein <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Raste Aur Raahein ✦",
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#0a0a0f;color:#e8e0d0">
          <div style="margin-bottom:24px;display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#c9a84c,#e9859a);display:inline-flex;align-items:center;justify-content:center;font-size:18px">✦</div>
            <span style="font-size:1.15rem;font-weight:600;color:#e8e0d0">Raste Aur Raahein</span>
          </div>

          <h1 style="font-size:1.75rem;font-weight:700;color:#c9a84c;margin:0 0 12px">You're on the journey now.</h1>
          <p style="color:#a09898;line-height:1.75;margin:0 0 20px">
            Thanks for subscribing! Every new trip story, honest cost breakdown, and packing list will land straight in your inbox.
          </p>
          <p style="color:#a09898;line-height:1.75;margin:0 0 24px">
            In the meantime, explore the latest itineraries on the blog.
          </p>
          <a href="https://rasteaurrahein.com/trips"
             style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#c9a84c,#e9859a);color:#0a0a0f;border-radius:100px;font-weight:600;text-decoration:none;font-size:0.95rem">
            Explore Trips →
          </a>

          <p style="color:#4a4040;font-size:0.75rem;margin-top:40px;border-top:1px solid #1e1e2a;padding-top:16px">
            You're receiving this because you signed up at rasteaurrahein.com.<br/>
            To unsubscribe, reply to this email with "unsubscribe" in the subject.
          </p>
        </div>
      `,
    });

    if (subscriberError) {
      console.error("Resend subscriber error:", subscriberError);
      // Don't fail silently — but still try to send the admin notification
    }

    // Notify the blog owner
    await resend.emails.send({
      from: "Raste Aur Raahein <onboarding@resend.dev>",
      to: ["zsumitksingh@gmail.com"],
      subject: `[Newsletter] New subscriber: ${email}`,
      text: `New newsletter subscriber: ${email}\nTimestamp: ${new Date().toISOString()}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
