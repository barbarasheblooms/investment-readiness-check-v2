import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"

// ─── Types ───────────────────────────────────────────────────────────────────

interface PDFData {
  name: string
  email: string
  startupName: string
  score: number
  traction: number
  team: number
  readiness: number
  stageLabel: string
  stageSub: string
  diagnosisTitle: string
  diagnosisBody: string
  journeyStageNumber: number
  journeyStageTitle: string
  journeyStageDescription: string
  gates: string[]
  journeyNextStep: string
  scoreColor: string
  submittedAt: string
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111827",
  },
  // Header
  header: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 20,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  brandName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#e11d48",
    letterSpacing: 1.5,
  },
  submittedAt: {
    fontSize: 8,
    color: "#9ca3af",
  },
  reportTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginTop: 8,
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 10,
    color: "#6b7280",
  },
  // Founder info
  founderRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  founderPill: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexShrink: 1,
  },
  founderPillLabel: {
    fontSize: 7,
    color: "#9ca3af",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  founderPillValue: {
    fontSize: 10,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },
  founderPillEmail: {
    fontSize: 9,
    color: "#4b5563",
  },
  // Score hero
  scoreHero: {
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 8,
    color: "#9ca3af",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  scoreNumber: {
    fontSize: 64,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
    marginBottom: 4,
  },
  scoreOut: {
    fontSize: 9,
    color: "#9ca3af",
    marginBottom: 10,
  },
  stageBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 2,
  },
  stageBadgeText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  stageSub: {
    fontSize: 9,
    color: "#9ca3af",
  },
  // Breakdown
  breakdownRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  breakdownCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
  },
  breakdownDimLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  breakdownScore: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  barBg: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  // Section
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  // Diagnosis box
  diagnosisBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  diagnosisTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  diagnosisBody: {
    fontSize: 9,
    lineHeight: 1.6,
  },
  // Journey
  journeyBox: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  journeyHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  journeyNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#eef0ff",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  journeyNumberText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#3730a3",
  },
  journeyMeta: {
    flex: 1,
  },
  journeyEyebrow: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  journeyTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  journeyDesc: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.6,
    marginBottom: 10,
  },
  gatesBox: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  gatesTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  gateRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 5,
  },
  gateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d1d5db",
    marginTop: 3,
    flexShrink: 0,
  },
  gateText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.5,
    flex: 1,
  },
  nextStepRow: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
  nextStepText: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.5,
  },
  nextStepBold: {
    fontFamily: "Helvetica-Bold",
    color: "#374151",
  },
  // Footer
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDiagnosisColors(scoreColor: string) {
  if (scoreColor === "#dc2626") {
    return { bg: "#fef2f2", border: "#fecaca", title: "#991b1b", body: "#b91c1c" }
  }
  if (scoreColor === "#d97706") {
    return { bg: "#fffbeb", border: "#fde68a", title: "#92400e", body: "#b45309" }
  }
  return { bg: "#f0fdf4", border: "#bbf7d0", title: "#14532d", body: "#15803d" }
}

function getDimColor(dim: string) {
  if (dim === "Traction") return "#e11d48"
  if (dim === "Team") return "#7c3aed"
  return "#0891b2"
}

// ─── Component ───────────────────────────────────────────────────────────────

export function QuizResultPDF({ data }: { data: PDFData }) {
  const diag = getDiagnosisColors(data.scoreColor)

  const dims = [
    { label: "Traction", value: data.traction },
    { label: "Team", value: data.team },
    { label: "Readiness", value: data.readiness },
  ]

  return (
    <Document
      title={`SheBlooms Investment Readiness — ${data.startupName}`}
      author="SheBlooms"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Text style={styles.brandName}>SHEBLOOMSVENTURE</Text>
            <Text style={styles.submittedAt}>{data.submittedAt}</Text>
          </View>
          <Text style={styles.reportTitle}>Investment Readiness Report</Text>
          <Text style={styles.reportSubtitle}>
            Generated automatically after quiz completion
          </Text>
        </View>

        {/* Founder info pills */}
        <View style={styles.founderRow}>
          <View style={styles.founderPill}>
            <Text style={styles.founderPillLabel}>Founder</Text>
            <Text style={styles.founderPillValue}>{data.name || "—"}</Text>
          </View>
          <View style={styles.founderPill}>
            <Text style={styles.founderPillLabel}>Startup</Text>
            <Text style={styles.founderPillValue}>{data.startupName || "—"}</Text>
          </View>
          <View style={styles.founderPill}>
            <Text style={styles.founderPillLabel}>Email</Text>
            <Text style={styles.founderPillEmail}>{data.email}</Text>
          </View>
        </View>

        {/* Score hero */}
        <View style={styles.scoreHero}>
          <Text style={styles.scoreLabel}>Readiness Score</Text>
          <Text style={[styles.scoreNumber, { color: data.scoreColor }]}>
            {data.score}
          </Text>
          <Text style={styles.scoreOut}>out of 100</Text>
          <View style={[styles.stageBadge, { backgroundColor: `${data.scoreColor}18` }]}>
            <Text style={[styles.stageBadgeText, { color: data.scoreColor }]}>
              {data.stageLabel}
            </Text>
          </View>
          <Text style={styles.stageSub}>{data.stageSub}</Text>
        </View>

        {/* Dimension breakdown */}
        <View style={styles.breakdownRow}>
          {dims.map((d) => (
            <View key={d.label} style={styles.breakdownCard}>
              <Text style={styles.breakdownDimLabel}>{d.label}</Text>
              <Text style={[styles.breakdownScore, { color: getDimColor(d.label) }]}>
                {d.value}
              </Text>
              <View style={styles.barBg}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${d.value}%`,
                      backgroundColor: getDimColor(d.label),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Diagnosis */}
        <View
          style={[
            styles.diagnosisBox,
            { backgroundColor: diag.bg, borderColor: diag.border },
          ]}
        >
          <Text style={[styles.diagnosisTitle, { color: diag.title }]}>
            {data.diagnosisTitle}
          </Text>
          <Text style={[styles.diagnosisBody, { color: diag.body }]}>
            {data.diagnosisBody}
          </Text>
        </View>

        {/* Journey stage */}
        <View style={styles.journeyBox}>
          <View style={styles.journeyHeader}>
            <View style={styles.journeyNumberCircle}>
              <Text style={styles.journeyNumberText}>{data.journeyStageNumber}</Text>
            </View>
            <View style={styles.journeyMeta}>
              <Text style={styles.journeyEyebrow}>
                Your position in the SheBlooms Journey
              </Text>
              <Text style={styles.journeyTitle}>
                Stage {data.journeyStageNumber} — {data.journeyStageTitle}
              </Text>
            </View>
          </View>

          <Text style={styles.journeyDesc}>{data.journeyStageDescription}</Text>

          <View style={styles.gatesBox}>
            <Text style={styles.gatesTitle}>Gates to close before moving forward</Text>
            {data.gates.map((gate, i) => (
              <View key={i} style={styles.gateRow}>
                <View style={styles.gateDot} />
                <Text style={styles.gateText}>{gate}</Text>
              </View>
            ))}
          </View>

          <View style={styles.nextStepRow}>
            <Text style={styles.nextStepText}>
              <Text style={styles.nextStepBold}>Next step: </Text>
              {data.journeyNextStep}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} SheBlooms Venture · Confidential
          </Text>
          <Text style={styles.footerText}>shebloomsventure.com</Text>
        </View>
      </Page>
    </Document>
  )
}
