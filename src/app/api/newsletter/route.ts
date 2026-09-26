import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, source, subscribeRouteReport } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
    }

    const subscriberName = typeof name === "string" && name.trim() ? name.trim() : "Traveler";
    const leadSource = typeof source === "string" && source.trim() ? source.trim() : "general-newsletter";

    let savedToProvider = false;

    // 1. Check for Buttondown API Key
    if (process.env.BUTTONDOWN_API_KEY) {
      try {
        const bdRes = await fetch("https://api.buttondown.email/v1/subscribers", {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            metadata: {
              name: subscriberName,
              source: leadSource,
              routeReport: Boolean(subscribeRouteReport),
            },
            tags: [leadSource, subscribeRouteReport ? "route-report" : "gpx-download"],
          }),
        });
        if (bdRes.ok || bdRes.status === 409) {
          savedToProvider = true;
        }
      } catch (err) {
        console.error("Buttondown integration error:", err);
      }
    }

    // 2. Check for Brevo API Key
    if (!savedToProvider && process.env.BREVO_API_KEY) {
      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            attributes: {
              FIRSTNAME: subscriberName,
              SOURCE: leadSource,
            },
            updateEnabled: true,
          }),
        });
        if (brevoRes.ok || brevoRes.status === 400) {
          savedToProvider = true;
        }
      } catch (err) {
        console.error("Brevo integration error:", err);
      }
    }

    // 3. Fallback to Resend if configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send a welcome / confirmation email to the subscriber
      try {
        await resend.emails.send({
          from: "Raste Aur Raahein <onboarding@resend.dev>",
          to: [email],
          subject: "Your Route Notes & Welcome to Raste Aur Raahein ✦",
          html: `
            <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#0a0a0f;color:#e8e0d0">
              <div style="margin-bottom:24px;display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#c9a84c,#e9859a);display:inline-flex;align-items:center;justify-content:center;font-size:18px">✦</div>
                <span style="font-size:1.15rem;font-weight:600;color:#e8e0d0">Raste Aur Raahein</span>
              </div>

              <h1 style="font-size:1.75rem;font-weight:700;color:#c9a84c;margin:0 0 12px">Welcome, ${subscriberName}!</h1>
              <p style="color:#a09898;line-height:1.75;margin:0 0 20px">
                Thanks for downloading our route data for <strong>${leadSource}</strong>. Every field-tested itinerary, honest cost breakdown, and mountain road advisory lands straight in your inbox.
              </p>
              <p style="color:#a09898;line-height:1.75;margin:0 0 24px">
                Check out the live pass conditions and new guides before you hit the highway:
              </p>
              <a href="https://raste-aur-rahein.vercel.app/road-conditions"
                 style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#c9a84c,#e9859a);color:#0a0a0f;border-radius:100px;font-weight:600;text-decoration:none;font-size:0.95rem">
                Live Himalayan Pass Tracker →
              </a>

              <p style="color:#6b7280;font-size:0.75rem;margin-top:40px;border-top:1px solid #1e1e2a;padding-top:16px">
                Privacy Note: You signed up for expedition route materials on raste-aur-rahein.vercel.app. We never share or sell your contact information.<br/>
                To unsubscribe anytime, reply with "unsubscribe" in the subject.
              </p>
            </div>
          `,
        });

        // Notify blog curator
        await resend.emails.send({
          from: "Raste Aur Raahein <onboarding@resend.dev>",
          to: ["zsumitksingh@gmail.com"],
          subject: `[Lead Capture] ${subscriberName} downloaded ${leadSource}`,
          text: `New subscriber: ${subscriberName} (${email})\nSource: ${leadSource}\nMonthly Report Opt-in: ${Boolean(subscribeRouteReport)}\nTimestamp: ${new Date().toISOString()}`,
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch notice:", emailErr);
      }
    } else {
      console.log(`[Lead Captured Dev Mode]: ${subscriberName} (${email}) for source ${leadSource}`);
    }

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully. Download link ready.",
    });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
