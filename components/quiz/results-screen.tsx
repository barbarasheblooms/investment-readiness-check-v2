"use client"

import { RadarChart } from "./radar-chart"
import { DIMENSIONS, getStage, type ScoreResult } from "@/lib/quiz-data"
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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

  const handleCTA = () => {
    const urls: Record<string, string> = {
      grow: "https://buy.stripe.com/eVqeVd87y9ST3XFaiQ1kA01",
      raise: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ahOOMJy2vYURbWfVkZ50FQEZVTWj5mjELf8UZR2d09-6tETZjcbZkh1qq-KtAQpY6aUojMXIt",
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
    { key: "traction", label: "Traction", score: breakdown.traction },
    { key: "team", label: "Team", score: breakdown.team },
    { key: "prep", label: "Readiness", score: breakdown.prep },
  ]

  let stepNumber = 0

  return (
    <div>
      {/* Hero Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 pt-10 shadow-sm text-center mb-4">
        <div className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-2">
          Your Readiness Score
        </div>

        <div
          className="font-serif text-[clamp(96px,20vw,128px)] font-normal leading-none tracking-tighter mb-1"
          style={{ color: stage.scoreColor }}
        >
          {total}
        </div>

        <div className="text-sm text-gray-400 mb-5">out of 100</div>

        <span
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[15px] font-medium mb-1"
          style={{ backgroundColor: stage.badgeBg, color: stage.badgeColor }}
        >
          {stage.label}
        </span>

        <div className="text-sm text-gray-400 mb-6">{stage.sub}</div>

        {/* Radar Chart */}
        <div className="flex justify-center mb-2">
          <RadarChart breakdown={breakdown} color={stage.scoreColor} />
        </div>

        {/* Dimension Cards */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {dimEntries.map((dim) => {
            const isWeak = dim.key === weakestDim
            const barColor = getScoreColor(dim.score)
            return (
              <div key={dim.key} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="text-xl font-medium mb-1" style={{ color: "inherit" }}>
                  {dim.score}
                </div>
                <div className="text-[10px] font-medium tracking-wider uppercase text-gray-400 mb-2">
                  {dim.label}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${dim.score}%`, backgroundColor: barColor }}
                  />
                </div>
                {isWeak && (
                  <span className="inline-block mt-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-brand-light text-brand">
                    Needs focus
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Diagnosis Box */}
      <div className={`border-l-[3px] p-5 mb-4 ${diagnosisStyles[stage.diagnosisClass]}`}>
        <div className={`font-medium text-[15px] mb-1.5 ${diagnosisTitleStyles[stage.diagnosisClass]}`}>
          {roadmap.diagnosisTitle}
        </div>
        <div className={`text-sm leading-relaxed ${diagnosisTextStyles[stage.diagnosisClass]}`}>
          {roadmap.diagnosisBody}
        </div>
      </div>

      {/* Roadmap Card */}
      <div className="bg-white border-[1.5px] border-brand rounded-xl p-5 mb-4 shadow-sm">

        {/* Raise badge */}
        {isRaise && (
          <div className="mb-3">
            <span className="inline-block text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand-light text-brand">
              Program Raise
            </span>
          </div>
        )}

        {/* ── Biggest Gap: header block ── */}
        <div className="mb-5">
          {/* Big label */}
          <div className="flex items-center gap-1.5 mb-1">
            <SvgIcon name={roadmap.gapIcon} size={13} className="text-brand" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-brand">
              {roadmap.gapLabel}
            </span>
          </div>

          {/* What to do next */}
          <div className="text-[11px] font-medium tracking-wider uppercase text-gray-400 mt-3 mb-0.5">
            What to do next:
          </div>
          <div className="text-[17px] font-semibold text-gray-900">
            {roadmap.focusTitle}
          </div>

          {isRaise && (
            <div className="text-sm text-gray-500 mt-1.5">
              Here's what we'll work on together:
            </div>
          )}
        </div>

        {/* ── Main gap dimension label + steps ── */}
        <div className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold tracking-widest uppercase text-brand">
          <SvgIcon name={roadmap.gapIcon} size={13} className="text-brand" />
          {DIM_LABELS[weakestDim] || weakestDim}
        </div>

        {roadmap.steps.map((step) => {
          stepNumber++
          return (
            <div key={stepNumber} className="py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="w-[22px] h-[22px] rounded-full bg-brand-light text-brand text-[11px] font-medium flex items-center justify-center flex-shrink-0">
                  {stepNumber}
                </span>
                <span className="text-[13px] font-medium text-gray-900">{step.title}</span>
              </div>
              <p className="ml-[30px] mt-1.5 text-[12px] text-gray-500 leading-relaxed">
                {step.body}
              </p>
            </div>
          )
        })}

        {/* ── Secondary dimension actions ── */}
        {secondaryActions.map((dim) => {
          stepNumber++
          return (
            <div key={dim.label}>
              <div className="flex items-center gap-1.5 pt-5 pb-2 text-[11px] font-semibold tracking-widest uppercase text-brand">
                <SvgIcon name={dim.icon} size={13} className="text-brand" />
                {dim.label}
              </div>
              <div className="py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-2">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand-light text-brand text-[11px] font-medium flex items-center justify-center flex-shrink-0">
                    {stepNumber}
                  </span>
                  <span className="text-[13px] font-medium text-gray-900">{dim.action.title}</span>
                </div>
                <p className="ml-[30px] mt-1.5 text-[12px] text-gray-500 leading-relaxed">
                  {dim.action.body}
                </p>
              </div>
            </div>
          )
        })}

        {/* ── CTA ── */}
        <div className="text-center mt-6 pt-5 border-t border-gray-100">
          {isRaise ? (
            <>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-3 max-w-[360px] mx-auto">
                Book a call to walk through your results together. We'll discuss your specific situation and build a plan to close your round.
              </p>
              <button
                onClick={handleCTA}
                className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-brand text-white text-[13px] font-medium rounded-lg border-none cursor-pointer hover:bg-brand-hover transition-colors"
              >
                Book your Raise call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </>
          ) : (
            <>
              <div className="text-[17px] font-semibold text-gray-900 mb-2">
                Start your personalized roadmap today and become investment-ready faster.
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4 max-w-[380px] mx-auto">
                Get the complete roadmap with proven templates, strategic frameworks, and expert guidance to build a business investors can't ignore.
              </p>
              <button
                onClick={handleCTA}
                className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-brand text-white text-[13px] font-medium rounded-lg border-none cursor-pointer hover:bg-brand-hover transition-colors"
              >
                Start my roadmap
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Retake Button */}
      <button
        onClick={onRetake}
        className="block mx-auto mt-4 bg-none border-none text-sm text-gray-400 cursor-pointer underline underline-offset-3 hover:text-gray-600"
      >
        Retake the quiz
      </button>
    </div>
  )
}
