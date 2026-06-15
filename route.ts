import { NextRequest, NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import React from "react"
import { QuizResultPDF } from "@/components/quiz/quiz-result-pdf"
import { getStage, getJourneyStage } from "@/lib/quiz-data"

// ─── Config ──────────────────────────────────────────────────────────────────

const NOTIFICATION_EMAILS = [
  "barbara@shebloomsventure.com",
  "rebeca@shebloomsventure.com",
  "team@shebloomsventure.com",
]

const FROM_EMAIL = "SheBlooms <noreply@shebloomsventure.com>"

// ─── Types ───────────────────────────────────────────────────────────────────

interface SendResultsPayload {
  name: string
  email: string
  startupName: string
  score: number
  traction: number
  team: number
  readiness: number
}

// ─── Email HTML template ─────────────────────────────────────────────────────

function buildEmailHTML(payload: SendResultsPayload & {
  stageLabel: string
  scoreColor: string
}) {
  const { name, email, startupName, score, traction, team, readiness, stageLabel, scoreColor } = payload

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Quiz Submission — ${startupName}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <!-- Header -->
        <tr>
          <td style="background:#111827;padding:24px 32px;">
            <p style="margin:0;color:#e11d48;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">SHEBLOOMSVENTURE</p>
            <p style="margin:6px 0 0;color:#ffffff;font-size:18px;font-weight:700;">New Quiz Submission</p>
            <p style="margin:2px 0 0;color:#9ca3af;font-size:12px;">A founder just completed the Investment Readiness Check</p>
          </td>
        </tr>
        <!-- Founder info -->
        <tr>
          <td style="padding:24px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:33%;padding-right:8px;">
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
                    <p style="margin:0 0 3px;font-size:9px;font-weight:700;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;">Founder</p>
                    <p style="margin:0;font-size:13px;font-weight:700;color:#111827;">${name || "—"}</p>
                  </div>
                </td>
                <td style="width:33%;padding-right:8px;">
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
                    <p style="margin:0 0 3px;font-size:9px;font-weight:700;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;">Startup</p>
                    <p style="margin:0;font-size:13px;font-weight:700;color:#111827;">${startupName || "—"}</p>
                  </div>
                </td>
                <td style="width:34%;">
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
                    <p style="margin:0 0 3px;font-size:9px;font-weight:700;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;">Email</p>
                    <p style="margin:0;font-size:12px;color:#374151;">${email}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Score -->
        <tr>
          <td style="padding:24px 32px;">
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:24px;text-align:center;">
              <p style="margin:0 0 6px;font-size:9px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;text-transform:uppercase;">Readiness Score</p>
              <p style="margin:0;font-size:64px;font-weight:800;line-height:1;color:${scoreColor};">${score}</p>
              <p style="margin:4px 0 12px;font-size:11px;color:#9ca3af;">out of 100</p>
              <span style="display:inline-block;background:${scoreColor}18;color:${scoreColor};border-radius:20px;padding:5px 16px;font-size:13px;font-weight:700;">${stageLabel}</span>
            </div>
          </td>
        </tr>
        <!-- Breakdown -->
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="margin:0 0 10px;font-size:9px;font-weight:700;color:#9ca3af;letter-spacing:1.2px;text-transform:uppercase;">Score Breakdown</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:33%;padding-right:6px;">
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;">Traction</p>
                    <p style="margin:0;font-size:24px;font-weight:800;color:#e11d48;">${traction}</p>
                  </div>
                </td>
                <td style="width:33%;padding-right:6px;">
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;">Team</p>
                    <p style="margin:0;font-size:24px;font-weight:800;color:#7c3aed;">${team}</p>
                  </div>
                </td>
                <td style="width:34%;">
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;">Readiness</p>
                    <p style="margin:0;font-size:24px;font-weight:800;color:#0891b2;">${readiness}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer note -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
              Full report attached as PDF · SheBlooms Venture · shebloomsventure.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const payload: SendResultsPayload = await req.json()
    const { name, email, startupName, score, traction, team, readiness } = payload

    const stage = getStage(score)
    const journey = getJourneyStage(score)

    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // 1. Generate PDF ──────────────────────────────────────────────────────────
    const pdfElement = React.createElement(QuizResultPDF, {
      data: {
        name,
        email,
        startupName,
        score,
        traction,
        team,
        readiness,
        stageLabel: stage.label,
        stageSub: stage.sub,
        diagnosisTitle: stage.diagnosisTitle,
        diagnosisBody: stage.diagnosisBody,
        journeyStageNumber: journey.number,
        journeyStageTitle: journey.title,
        journeyStageDescription: journey.description,
        gates: journey.gates,
        journeyNextStep: journey.nextStep,
        scoreColor: stage.scoreColor,
        submittedAt,
      },
    })

    const pdfBuffer = await renderToBuffer(pdfElement)

    // 2. Send via Resend ───────────────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error("RESEND_API_KEY not set — skipping email")
      return NextResponse.json({ success: false, reason: "no_api_key" }, { status: 500 })
    }

    const safeStartupName = (startupName || "unknown")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAILS,
        subject: `🌸 New Quiz: ${startupName || email} — ${score}/100 (${stage.label})`,
        html: buildEmailHTML({ ...payload, stageLabel: stage.label, scoreColor: stage.scoreColor }),
        attachments: [
          {
            filename: `shebloms-readiness-${safeStartupName}.pdf`,
            content: pdfBuffer.toString("base64"),
          },
        ],
      }),
    })

    if (!resendRes.ok) {
      const err = await resendRes.text()
      console.error("Resend error:", err)
      return NextResponse.json({ success: false, reason: err }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("send-results error:", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
