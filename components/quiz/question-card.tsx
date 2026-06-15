"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
import { QUESTIONS, DIMENSIONS } from "@/lib/quiz-data"

interface QuestionCardProps {
  questionIndex: number
  totalQuestions: number
  selectedScore: number | null
  onSelect: (score: number) => void
  onNext: () => void
  onBack: () => void
}

export function QuestionCard({ 
  questionIndex, 
  totalQuestions,
  selectedScore, 
  onSelect, 
  onNext, 
  onBack 
}: QuestionCardProps) {
  const question = QUESTIONS[questionIndex]
  const dimension = DIMENSIONS[question.dimension]
  const progress = Math.round(((questionIndex + 1) / totalQuestions) * 100)
  const isLastQuestion = questionIndex === totalQuestions - 1

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: dimension.color }}>
          {dimension.label}
        </span>
        <span className="text-xs text-gray-400">{questionIndex + 1} of {totalQuestions}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden mb-7">
        <div
          className="h-full rounded-full transition-all duration-400"
          style={{ width: `${progress}%`, backgroundColor: dimension.color }}
        />
      </div>

      {/* Question */}
      <p className="font-serif text-[clamp(18px,3vw,22px)] font-normal leading-snug tracking-tight mb-6">
        {question.text}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedScore === option.score
          return (
            <button
              key={option.score}
              onClick={() => onSelect(option.score)}
              className={`flex items-start gap-3 w-full p-3.5 bg-white border rounded-lg cursor-pointer text-left text-sm leading-relaxed text-gray-700 transition-all ${
                isSelected ? "border-brand bg-brand-light" : "border-gray-200 hover:border-indigo-300 hover:bg-[#fafbff]"
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  isSelected ? "bg-brand border-brand" : "border-gray-300"
                }`}
                style={{ width: "18px", height: "18px" }}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full bg-white transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              <span>{option.text}</span>
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-transparent border border-gray-200 rounded-lg px-5 py-2.5 text-sm text-gray-500 cursor-pointer transition-all hover:border-gray-400 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedScore === null}
          className="flex items-center gap-1.5 bg-brand text-white border-none rounded-lg px-6 py-2.5 text-sm font-medium cursor-pointer transition-all hover:bg-brand-hover disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default"
        >
          {isLastQuestion ? "See my result" : "Next"}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
