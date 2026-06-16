"use client"

import { Star, ArrowRight } from "lucide-react"
import { DIMENSIONS } from "@/lib/quiz-data"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand bg-brand-light px-3 py-1 rounded-full mb-6">
        <Star className="w-3 h-3" />
        Free Assessment
      </span>

      <h1 className="font-serif text-[clamp(30px,5vw,44px)] font-normal leading-[1.18] tracking-tight mb-4">
        Is your startup ready
        <br />
        to <em className="italic text-brand">raise investment?</em>
      </h1>

      <p className="text-base text-gray-500 leading-relaxed mb-8">
        Answer 13 questions in under 3 minutes and receive your Readiness Score. Discover which investment stage
        (Pre-Seed, Seed, or Series A) you are ready for right now.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-9">
        {Object.values(DIMENSIONS).map((dim) => (
          <div
            key={dim.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-500"
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dim.color }} />
            {dim.label}
          </div>
        ))}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-gray-300" />
          Investment stage diagnosis
        </div>
      </div>

      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 bg-brand text-white border-none rounded-lg px-8 py-3.5 text-[15px] font-medium cursor-pointer transition-all hover:bg-brand-hover hover:-translate-y-0.5"
      >
        Start Assessment
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-gray-400 mt-3">Free · 13 questions · ~3 minutes · No account required to start</p>
    </div>
  )
}
