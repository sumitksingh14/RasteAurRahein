/**
 * Email helper using Resend SDK.
 * All sends are best-effort (errors are logged, not thrown).
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use Resend's shared sender for now (replace with a verified domain later)
const FROM = "Raste Aur Raahein <onboarding@resend.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raste-aur-rahein.vercel.app";

/**
 * Notify the group organizer that someone has joined their trip.
 */
export async function sendGroupJoinNotification({
  organizerEmail,
  organizerName,
  joinerName,
  groupName,
  groupId,
}: {
  organizerEmail: string;
  organizerName: string;
  joinerName: string;
  groupName: string;
  groupId: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: organizerEmail,
      subject: `${joinerName} joined your trip: ${groupName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 2rem;">
          <h2 style="color: #006CE4; margin-bottom: 0.5rem;">Someone joined your group trip! 🎉</h2>
          <p style="color: #374151; line-height: 1.6;">
            Hi ${organizerName}, <strong>${joinerName}</strong> has just joined your group trip
            <strong>"${groupName}"</strong>.
          </p>
          <p style="margin: 1.5rem 0;">
            <a href="${SITE_URL}/trips/group/${groupId}"
               style="background: #006CE4; color: white; padding: 0.65rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              View Group Trip
            </a>
          </p>
          <p style="color: #9CA3AF; font-size: 0.8rem;">
            Raste Aur Raahein · India's travel community
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("sendGroupJoinNotification failed:", err);
  }
}

/**
 * Send an invite email to a new member.
 */
export async function sendGroupInviteEmail({
  toEmail,
  inviterName,
  groupName,
  groupId,
  token,
}: {
  toEmail: string;
  inviterName: string;
  groupName: string;
  groupId: string;
  token: string;
}) {
  const joinUrl = `${SITE_URL}/trips/group/${groupId}/join?token=${token}`;
  try {
    await resend.emails.send({
      from: FROM,
      to: toEmail,
      subject: `${inviterName} invited you to join: ${groupName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 2rem;">
          <h2 style="color: #006CE4; margin-bottom: 0.5rem;">You're invited! 🗺️</h2>
          <p style="color: #374151; line-height: 1.6;">
            <strong>${inviterName}</strong> has invited you to join their group trip
            <strong>"${groupName}"</strong> on Raste Aur Raahein.
          </p>
          <p style="margin: 1.5rem 0;">
            <a href="${joinUrl}"
               style="background: #006CE4; color: white; padding: 0.65rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
              Join the Trip
            </a>
          </p>
          <p style="color: #6B7280; font-size: 0.85rem;">This invite link expires in 7 days.</p>
          <p style="color: #9CA3AF; font-size: 0.8rem;">
            Raste Aur Raahein · India's travel community
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("sendGroupInviteEmail failed:", err);
  }
}

/**
 * Notify the site owner when a custom trip enquiry is submitted
 * via the "Want this planned for you?" CTA block on any trip page.
 */
export async function sendEnquiryNotification({
  name,
  email,
  message,
  tripTitle,
  tripSlug,
}: {
  name: string;
  email: string;
  message: string;
  tripTitle: string;
  tripSlug: string;
}) {
  const tripUrl = `${SITE_URL}/trips/${tripSlug}`;
  try {
    await resend.emails.send({
      from: FROM,
      to: "zsumitksingh@gmail.com",
      replyTo: email,
      subject: `New Custom Trip Enquiry — ${tripTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 2rem; background: #fafafa; border-radius: 12px; border: 1px solid #e5e7eb;">
          <h2 style="color: #111318; margin: 0 0 0.5rem; font-size: 1.25rem;">🗺️ New Custom Trip Enquiry</h2>
          <p style="color: #6b7280; font-size: 0.85rem; margin: 0 0 1.5rem;">
            Someone wants this trip planned for them via <a href="${tripUrl}" style="color:#006CE4;">${tripTitle}</a>
          </p>
          <table style="width:100%; border-collapse:collapse; margin-bottom:1.5rem;">
            <tr><td style="padding:0.5rem 0; border-bottom:1px solid #e5e7eb; color:#374151; font-weight:600; width:100px;">Name</td><td style="padding:0.5rem 0; border-bottom:1px solid #e5e7eb; color:#111318;">${name}</td></tr>
            <tr><td style="padding:0.5rem 0; border-bottom:1px solid #e5e7eb; color:#374151; font-weight:600;">Email</td><td style="padding:0.5rem 0; border-bottom:1px solid #e5e7eb;"><a href="mailto:${email}" style="color:#006CE4;">${email}</a></td></tr>
            <tr><td style="padding:0.5rem 0; color:#374151; font-weight:600; vertical-align:top;">Message</td><td style="padding:0.5rem 0; color:#111318; line-height:1.6;">${message.replace(/\n/g, "<br>")}</td></tr>
          </table>
          <a href="mailto:${email}?subject=Re: Custom Trip — ${encodeURIComponent(tripTitle)}"
             style="background:#006CE4; color:white; padding:0.65rem 1.5rem; border-radius:8px; text-decoration:none; font-weight:600; display:inline-block; font-size:0.9rem;">
            Reply to ${name}
          </a>
          <p style="color:#9ca3af; font-size:0.75rem; margin-top:1.5rem;">
            Raste Aur Raahein · Enquiry received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("sendEnquiryNotification failed:", err);
  }
}
