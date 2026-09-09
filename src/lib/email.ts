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
