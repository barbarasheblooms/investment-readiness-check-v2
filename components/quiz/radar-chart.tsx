"use client"

import type { ScoreBreakdown } from "@/lib/quiz-data"

interface RadarChartProps {
  breakdown: ScoreBreakdown
  color: string
}

export function RadarChart({ breakdown, color }: RadarChartProps) {
  const cx = 190
  const cy = 165
  const r = 95

  const dimensions: [keyof ScoreBreakdown, string, string][] = [
    ["traction", "Traction", "#5b75fe"],
    ["team", "Team", "#7c3aed"],
    ["prep", "Readiness", "#059669"],
  ]

  const angles = [-90, 30, 150].map((a) => (a * Math.PI) / 180)
  const anchors: ("middle" | "start" | "end")[] = ["middle", "start", "end"]
  const labelOffsets = [
    [0, -26],
    [14, 10],
    [-14, 10],
  ]

  // Grid lines
  const gridLines = [0.25, 0.5, 0.75, 1].map((factor, i) => {
    const points = angles
      .map((angle) => `${cx + factor * r * Math.cos(angle)},${cy + factor * r * Math.sin(angle)}`)
      .join(" ")
    return <polygon key={i} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />
  })

  // Axis lines
  const axisLines = angles.map((angle, i) => (
    <line
      key={i}
      x1={cx}
      y1={cy}
      x2={cx + r * Math.cos(angle)}
      y2={cy + r * Math.sin(angle)}
      stroke="#e5e7eb"
      strokeWidth="1"
    />
  ))

  // Data polygon
  const values = [breakdown.traction / 100, breakdown.team / 100, breakdown.prep / 100]
  const dataPoints = angles
    .map((angle, i) => `${cx + values[i] * r * Math.cos(angle)},${cy + values[i] * r * Math.sin(angle)}`)
    .join(" ")

  // Data dots
  const dataDots = angles.map((angle, i) => (
    <circle
      key={i}
      cx={cx + values[i] * r * Math.cos(angle)}
      cy={cy + values[i] * r * Math.sin(angle)}
      r="5"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
    />
  ))

  // Labels
  const labels = angles.map((angle, i) => {
    const lx = cx + (r + 34) * Math.cos(angle) + labelOffsets[i][0]
    const ly = cy + (r + 34) * Math.sin(angle) + labelOffsets[i][1]
    const dim = dimensions[i]
    return (
      <g key={i}>
        <text
          x={lx}
          y={ly}
          textAnchor={anchors[i]}
          fontSize="12"
          fontFamily="var(--font-geist), sans-serif"
          fill={dim[2]}
          fontWeight="500"
        >
          {dim[1]}
        </text>
        <text
          x={lx}
          y={ly + 16}
          textAnchor={anchors[i]}
          fontSize="11"
          fontFamily="var(--font-geist), sans-serif"
          fill="#9ca3af"
        >
          {breakdown[dim[0]]}/100
        </text>
      </g>
    )
  })

  return (
    <svg
      viewBox="0 0 380 330"
      width="340"
      height="295"
      role="img"
      aria-label="Radar chart showing scores for Traction, Team and Readiness"
      style={{ overflow: "visible" }}
    >
      {gridLines}
      {axisLines}
      <polygon
        points={dataPoints}
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {dataDots}
      {labels}
    </svg>
  )
}
