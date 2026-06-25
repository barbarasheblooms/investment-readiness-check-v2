"use client"

import { RadarChart } from "./radar-chart"
import { getStage, type ScoreResult } from "@/lib/quiz-data"
import {
  getWeakestDimension,
  getRoadmap,
  getSecondaryActions,
  getScoreColor,
} from "@/lib/roadmap-data"

interface ResultsScreenProps {
  result: ScoreResult
  onRetake: () => void
}

const DIM_ICONS: Record<string, string> = {
  "chart-bar": "M3 12h4v9H3v-9zm7-4h4v13h-4V8zm7-6h4v19h-4V2z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm11 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  "file-text": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8m8 4H8m2-8H8",
}

const DIM_LABELS: Record<string, string> = {
  traction: "Traction",
  team: "Team",
  prep: "Readiness",
}

function SvgIcon({ name, size = 14, className = "" }: { name: string; size?: number; className?: string }) {
  const path = DIM_ICONS[name]
  if (!path) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  )
}

export function ResultsScreen({ result, onRetake }: ResultsScreenProps) {
  const { total, breakdown } = result
  const stage = getStage(total)
  const weakestDim = getWeakestDimension(breakdown)
  const roadmap = getRoadmap(stage.key, weakestDim)
  const secondaryActions = getSecondaryActions(stage.key, weakestDim)
  const isRaise = roadmap.plan === "raise"
  const isGrow = roadmap.plan === "grow"

  const minScore = Math.min(breakdown.traction, breakdown.team, breakdown.prep)
  const weakestDims = (["traction", "team", "prep"] as const).filter((k) => breakdown[k] === minScore)

  const handleCTA = () => {
    const urls: Record<string, string> = {
      grow: "https://buy.stripe.com/eVqeVd87y9ST3XFaiQ1kA01",
      raise: "https://calendar.app.google/xggHVg31RHNugTF68",
    }
    window.open(urls[roadmap.plan], "_blank")
  }

  const diagnosisStyles: Record<string, string> = {
    red: "bg-[#fef2f2] border-l-[#E24B4A]",
    amber: "bg-[#fffbeb] border-l-[#EF9F27]",
    green: "bg-[#f0fdf4] border-l-[#1D9E75]",
  }
  const diagnosisTitleStyles: Record<string, string> = {
    red: "text-[#991b1b]",
    amber: "text-[#92400e]",
    green: "text-[#14532d]",
  }
  const diagnosisTextStyles: Record<string, string> = {
    red: "text-[#b91c1c]",
    amber: "text-[#b45309]",
    green: "text-[#15803d]",
  }

  const dimEntries = [
    { key: "traction" as const, label: "Traction", score: breakdown.traction },
    { key: "team" as const, label: "Team", score: breakdown.team },
    { key: "prep" as const, label: "Readiness", score: breakdown.prep },
  ]

  let stepNumber = 0

  return (
    <div>
      {/* Hero Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 pt-10 shadow-sm text-center mb-4">
        <div className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-2">Your Readiness Score</div>
        <div className="font-serif text-[clamp(96px,20vw,128px)] font-normal leading-none tracking-tighter mb-1" style={{ color: stage.scoreColor }}>{total}</div>
        <div className="text-sm text-gray-400 mb-5">out of 100</div>
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[15px] font-medium mb-1" style={{ backgroundColor: stage.badgeBg, color: stage.badgeColor }}>{stage.label}</span>
        <div className="text-sm text-gray-400 mb-4">{stage.sub}</div>
        <div className="flex justify-center mb-0">
          <RadarChart breakdown={breakdown} color={stage.scoreColor} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {dimEntries.map((dim) => {
            const isWeak = dim.score === minScore
            const barColor = getScoreColor(dim.score)
            return (
              <div key={dim.key} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <div className="text-xl font-medium mb-1">{dim.score}</div>
                <div className="text-[10px] font-medium tracking-wider uppercase text-gray-400 mb-2">{dim.label}</div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${dim.score}%`, backgroundColor: barColor }} />
                </div>
                {isWeak && isGrow && (
                  <span className="inline-block mt-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-brand-light text-brand">Needs focus</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Diagnosis Box */}
      <div className={`border-l-[3px] rounded-xl p-5 mb-4 ${diagnosisStyles[stage.diagnosisClass]}`}>
        <div className={`font-medium text-[15px] mb-1.5 ${diagnosisTitleStyles[stage.diagnosisClass]}`}>{roadmap.diagnosisTitle}</div>
        <div className={`text-sm leading-relaxed ${diagnosisTextStyles[stage.diagnosisClass]}`}>{roadmap.diagnosisBody}</div>
      </div>

      {/* Roadmap Card */}
      <div className="bg-white border-[1.5px] border-brand rounded-xl p-6 mb-4 shadow-sm">

        {/* Program badge */}
        {isRaise && (
          <div className="mb-4">
            <span className="inline-block text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand-light text-brand">Program Raise</span>
          </div>
        )}
        {isGrow && (
          <div className="mb-4">
            <span className="inline-block text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand-light text-brand">Program Grow</span>
          </div>
        )}

        {/* Biggest Gap header */}
        <div className="mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <SvgIcon name={roadmap.gapIcon} size={13} className="text-brand" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-brand">
              {weakestDims.length > 1
                ? `Your Biggest Gap: ${weakestDims.map((k) => DIM_LABELS[k]).join(" & ")}`
                : roadmap.gapLabel}
            </span>
          </div>
          <div className="pl-[21px]">
            <div className="text-[11px] font-medium tracking-wider uppercase text-gray-400 mb-1">What to do next:</div>
            <div className="text-[18px] font-semibold text-gray-900 leading-snug">{roadmap.focusTitle}</div>
            {isRaise && (
              <div className="text-sm text-gray-500 mt-2">Here's what we'll work on together:</div>
            )}
          </div>
        </div>

        {/* Main gap dimension label */}
        <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold tracking-widest uppercase text-brand">
          <SvgIcon name={roadmap.gapIcon} size={13} className="text-brand" />
          {DIM_LABELS[weakestDim] || weakestDim}
        </div>

        {/* Main gap steps */}
        {roadmap.steps.map((step) => {
          stepNumber++
          return (
            <div key={stepNumber} className="py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-start gap-2.5">
                <span className="w-[22px] h-[22px] rounded-full bg-brand-light text-brand text-[11px] font-medium flex items-center justify-center flex-shrink-0 mt-0.5">{stepNumber}</span>
                <span className="text-[13px] font-medium text-gray-900">{step.title}</span>
              </div>
              <p className="ml-[30px] mt-1.5 text-[12px] text-gray-500 leading-relaxed">{step.body}</p>
            </div>
          )
        })}

        {/* Secondary dimension actions */}
        {secondaryActions.map((dim) => {
          stepNumber++
          return (
            <div key={dim.label}>
              <div className="flex items-center gap-2 pt-5 pb-3 text-[11px] font-semibold tracking-widest uppercase text-brand">
                <SvgIcon name={dim.icon} size={13} className="text-brand" />
                {dim.label}
              </div>
              <div className="py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start gap-2.5">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand-light text-brand text-[11px] font-medium flex items-center justify-center flex-shrink-0 mt-0.5">{stepNumber}</span>
                  <span className="text-[13px] font-medium text-gray-900">{dim.action.title}</span>
                </div>
                <p className="ml-[30px] mt-1.5 text-[12px] text-gray-500 leading-relaxed">{dim.action.body}</p>
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div className="text-center mt-6 pt-6 border-t border-gray-100">
          {isRaise ? (
            <>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4 max-w-[360px] mx-auto">Book a call to walk through your results together. We'll discuss your specific situation and build a plan to close your round.</p>
              <button onClick={handleCTA} className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-brand text-white text-[15px] font-medium rounded-lg border-none cursor-pointer hover:bg-brand-hover transition-colors max-w-[380px] w-full justify-center">
                Book your Raise call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </>
          ) : (
            <>
              {isGrow && (
                <div className="flex justify-center mb-3">
                  <span className="inline-block text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full bg-brand-light text-brand">YOU'RE READY TO GROW</span>
                </div>
              )}
              <div className="text-[17px] font-semibold text-gray-900 mb-2 leading-snug max-w-[380px] mx-auto">
                Start your personalized roadmap today and become investment-ready faster.
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4 max-w-[340px] mx-auto">
                Get the complete roadmap with proven templates, strategic frameworks, and expert guidance to build a business investors&nbsp;can't&nbsp;ignore.
              </p>
              <button onClick={handleCTA} className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-brand text-white text-[15px] font-medium rounded-lg border-none cursor-pointer hover:bg-brand-hover transition-colors max-w-[380px] w-full justify-center">
                Start my roadmap
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </>
          )}
        </div>
      </div>

      <button onClick={onRetake} className="block mx-auto mt-4 bg-none border-none text-sm text-gray-400 cursor-pointer underline underline-offset-3 hover:text-gray-600">
        Retake the quiz
      </button>
    </div>
  )
}
