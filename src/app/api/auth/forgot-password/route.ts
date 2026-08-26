import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { randomBytes } from "crypto";
import { redis } from "@/lib/redis";

const RESET_TTL = 60 * 60; // 1 hour in seconds
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json();

    if (!identifier?.trim()) {
      return NextResponse.json({ error: "Email or username is required" }, { status: 400 });
    }

    const input = identifier.trim();

    // Look up userId by email or username
    let userId: string | null = null;
    if (input.includes("@")) {
      userId = await redis.get(`user:email:${input.toLowerCase()}`);
    } else {
      userId = await redis.get(`user:username:${input.toLowerCase()}`);
    }

    // Always return 200 even if user not found — prevents email enumeration
    if (!userId) {
      return NextResponse.json({ success: true });
    }

    const userHash = await redis.hgetall(`user:${userId}`);
    if (!userHash?.email) {
      return NextResponse.json({ success: true });
    }

    // Generate a secure random token
    const token = randomBytes(32).toString("hex");
    await redis.set(`pwd:reset:${token}`, userId, RESET_TTL);

    const resetUrl = `${BASE_URL}/reset-password?token=${token}`;

    // Send reset email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Raste Aur Raahein <onboarding@resend.dev>",
      to: [userHash.email],
      subject: "Reset your Raste Aur Raahein password",
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#0a0a0f;color:#e8e0d0">
          <!-- Header -->
          <div style="margin-bottom:28px;display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#c9a84c,#e9859a);display:inline-flex;align-items:center;justify-content:center;font-size:18px">✦</div>
            <span style="font-size:1.1rem;font-weight:600;color:#e8e0d0">Raste Aur Raahein</span>
          </div>

          <h1 style="font-size:1.6rem;font-weight:700;color:#c9a84c;margin:0 0 16px">Reset your password</h1>

          <p style="color:#a09898;line-height:1.75;margin:0 0 12px">
            Hi <strong style="color:#e8e0d0">@${userHash.username}</strong>,
          </p>
          <p style="color:#a09898;line-height:1.75;margin:0 0 28px">
            We received a request to reset your password. Click the button below to choose a new one.
            This link expires in <strong style="color:#e8e0d0">1 hour</strong>.
          </p>

          <a href="${resetUrl}"
             style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c9a84c,#e9859a);color:#0a0a0f;border-radius:100px;font-weight:700;text-decoration:none;font-size:0.95rem;letter-spacing:0.02em">
            Reset Password →
          </a>

          <p style="color:#6a5c5c;font-size:0.82rem;margin-top:28px;line-height:1.6">
            Or copy and paste this link into your browser:<br/>
            <span style="color:#c9a84c;word-break:break-all">${resetUrl}</span>
          </p>

          <p style="color:#4a4040;font-size:0.78rem;margin-top:32px;line-height:1.5">
            If you didn't request this, you can safely ignore this email — your password won't change.<br/>
            This link expires in 1 hour and can only be used once.
          </p>

          <div style="margin-top:40px;padding-top:16px;border-top:1px solid #1e1e2a;color:#4a4040;font-size:0.72rem">
            Raste Aur Raahein · rasteaurrahein.com
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
