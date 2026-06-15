"use client"

import { useState, useEffect, useRef } from "react"
import { IntroScreen } from "./intro-screen"
import { QuestionCard } from "./question-card"
import { CaptureForm } from "./capture-form"
import { ResultsScreen } from "./results-screen"
import { QUESTIONS, calculateScore, getStage, type ScoreResult } from "@/lib/quiz-data"
import { saveQuizLead } from "@/lib/supabase"
import { saveHubSpotLead } from "@/lib/hubspot"

type Phase = "intro" | "quiz" | "capture" | "results"

interface QuizState {
  phase: Phase
  questionIndex: number
  answers: Record<number, number>
  selectedScore: number | null
  name: string
  email: string
  startupName: string
  result: ScoreResult | null
}

const initialState: QuizState = {
  phase: "intro",
  questionIndex: 0,
  answers: {},
  selectedScore: null,
  name: "",
  email: "",
  startupName: "",
  result: null,
}

const TOTAL_QUESTIONS = 13

export function Quiz() {
  const [state, setState] = useState<QuizState>(initialState)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rootRef.current) {
      const top = Math.max(0, rootRef.current.getBoundingClientRect().top + window.scrollY - 80)
      window.scrollTo({ top, behavior: "smooth" })
    }
  }, [state.phase, state.questionIndex])

  const handleStart = () => {
    setState({ ...initialState, phase: "quiz" })
  }

  const handleSelect = (score: number) => {
    setState((prev) => ({ ...prev, selectedScore: score }))
  }

  const handleNext = () => {
    if (state.selectedScore === null) return

    const currentQuestion = QUESTIONS[state.questionIndex]
    const newAnswers = { ...state.answers, [currentQuestion.id]: state.selectedScore }

    if (state.questionIndex < TOTAL_QUESTIONS - 1) {
      setState((prev) => ({
        ...prev,
        answers: newAnswers,
        questionIndex: prev.questionIndex + 1,
        selectedScore: null,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        answers: newAnswers,
        phase: "capture",
      }))
    }
  }

  const handleBack = () => {
    if (state.questionIndex === 0) {
      setState({ ...initialState })
      return
    }

    const prevQuestion = QUESTIONS[state.questionIndex - 1]
    setState((prev) => ({
      ...prev,
      questionIndex: prev.questionIndex - 1,
      selectedScore: prev.answers[prevQuestion.id] ?? null,
    }))
  }

  const handleSubmit = async (name: string, email: string, startupName: string) => {
    const result = calculateScore(state.answers)
    const stage = getStage(result.total)

    // Determine weakest dimension
    const { traction, team, prep } = result.breakdown
    let weakestDimension = "traction"
    if (team <= traction && team <= prep) weakestDimension = "team"
    else if (prep <= traction && prep <= team) weakestDimension = "prep"

    const leadData = {
      name,
      email,
      startup_name: startupName,
      score: result.total,
      traction: result.breakdown.traction,
      team: result.breakdown.team,
      readiness: result.breakdown.prep,
      stage: stage.key,
      plan: stage.plan,
      answers: state.answers,
      weakest_dimension: weakestDimension,
    }

    // Save to Supabase and HubSpot in parallel, send email notification (fire-and-forget)
    await Promise.all([
      saveQuizLead(leadData),
      saveHubSpotLead(leadData),
    ])

    // Send PDF email notification to SheBlooms team (non-blocking)
    fetch("/api/send-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        startupName,
        score: result.total,
        traction: result.breakdown.traction,
        team: result.breakdown.team,
        readiness: result.breakdown.prep,
      }),
    }).catch((err) => console.error("Email notification failed:", err))

    setState((prev) => ({
      ...prev,
      name,
      email,
      startupName,
      result,
      phase: "results",
    }))
  }

  const handleRetake = () => {
    setState(initialState)
  }

  return (
    <div ref={rootRef}>
      {state.phase === "intro" && <IntroScreen onStart={handleStart} />}

      {state.phase === "quiz" && (
        <QuestionCard
          questionIndex={state.questionIndex}
          totalQuestions={TOTAL_QUESTIONS}
          selectedScore={state.selectedScore}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {state.phase === "capture" && <CaptureForm onSubmit={handleSubmit} />}

      {state.phase === "results" && state.result && <ResultsScreen result={state.result} onRetake={handleRetake} />}
    </div>
  )
}
