// Roadmap data: 12 combinations of stage × weakest dimension
// Each combination has: diagnosis, main gap steps (2), and secondary dimension actions (1 each)

export interface RoadmapStep {
  title: string
  body: string
}

export interface DimensionActions {
  label: string
  icon: string
  action: RoadmapStep
}

export interface RoadmapCombo {
  diagnosisTitle: string
  diagnosisBody: string
  gapLabel: string
  gapIcon: string
  focusTitle: string
  steps: RoadmapStep[]
  plan: "grow" | "raise"
}

type StageKey = "not-ready" | "pre-seed" | "seed" | "series-a"
type DimKey = "traction" | "team" | "prep"

// Secondary dimension actions: 1 action per dimension per stage
export const SECONDARY_ACTIONS: Record<string, Record<StageKey, RoadmapStep>> = {
  traction: {
    "not-ready": {
      title: "Start problem discovery interviews with at least 10 potential customers",
      body: "Pick people who match your target profile but are not friends or family. Ask open questions about how they deal with the problem today, what they've tried, and what frustrates them most.",
    },
    "pre-seed": {
      title: "Build towards your first paying customers, even if just a handful",
      body: "Free users prove curiosity. Paying users prove value. Even 3-5 strangers who pay a small amount for early access is more convincing to investors than 500 free signups.",
    },
    "seed": {
      title: "Document your MoM growth, retention, and churn with real numbers",
      body: "Investors at seed expect to see these metrics. Even if the numbers are modest, having them tracked consistently shows operational maturity.",
    },
    "series-a": {
      title: "Prove growth consistency across 3+ months through repeatable channels",
      body: "Series A investors want a pattern, not a spike. Show that your acquisition works predictably across multiple months without one-off campaigns distorting the trend.",
    },
  },
  team: {
    "not-ready": {
      title: "Identify your biggest skill gap and start looking for a co-founder or advisor",
      body: "Map what the company needs in the next 12 months versus what you can do yourself. The gap defines who to look for. Start with your professional network, co-founder matching platforms, and local startup events.",
    },
    "pre-seed": {
      title: "Formalise your company structure, cap table, and vesting",
      body: "Incorporate if you haven't. Set up a clean cap table with founders holding the majority. Establish vesting schedules. These are basic hygiene items investors check in the first meeting.",
    },
    "seed": {
      title: "Plan the 2-3 key hires you'll make post-raise with clear timelines",
      body: "Investors want to see that you know exactly where the money goes. Map the roles, the profiles, the compensation range, and when each hire needs to happen.",
    },
    "series-a": {
      title: "Map VP-level gaps and start building a hiring pipeline",
      body: "Series A investors want to see functional leadership forming. If you don't have a VP Product, VP Sales, or CTO, you should have a plan and pipeline for those hires.",
    },
  },
  prep: {
    "not-ready": {
      title: "Draft a basic pitch covering problem, solution, team, market, and your ask",
      body: "Keep it simple. At this stage, investors don't expect a polished deck. They expect clarity: what problem, why you, how big is the opportunity, and how much do you need.",
    },
    "pre-seed": {
      title: "Update your pitch deck to lead with real traction data",
      body: "You have evidence now. Move it to the front of the deck. Replace assumptions with actual numbers: users, revenue, retention, feedback. Test the deck in 3-5 practice pitches before real meetings.",
    },
    "seed": {
      title: "Build financial projections for 12-24 months with defensible assumptions",
      body: "Investors at seed expect a real model: burn rate, runway, growth projections, and unit economics. Every number should tie to an assumption you can explain and defend under pressure.",
    },
    "series-a": {
      title: "Complete your data room with every document an investor might request",
      body: "Legal, financial, IP, contracts, employee agreements. At Series A, due diligence is thorough. Having everything organised and current saves weeks and signals professionalism.",
    },
  },
}

export const ROADMAP_DATA: Record<string, RoadmapCombo> = {
  "not-ready_traction": {
    diagnosisTitle: "Your startup is still in its foundation phase.",
    diagnosisBody:
      "Investors fund execution, not ideas. Before any investor conversation, you need to confirm the problem is real and worth solving. Skipping this step risks burning relationships you may need later. The right move is closing this gap now.",
    gapLabel: "Your biggest gap: traction",
    gapIcon: "chart-bar",
    focusTitle: "Validate the problem before building",
    steps: [
      {
        title: "Run problem discovery interviews",
        body: "Talk to 20+ strangers in your target audience. Ask how they experience the problem today, what they've tried, and how much it costs them. Focus entirely on their reality, not your solution.",
      },
      {
        title: "Search for organic demand signals",
        body: "Look for people actively complaining about this problem or asking for solutions in Reddit, Twitter/X, forums, and communities. If nobody is talking about this pain point, that tells you something important.",
      },
    ],
    plan: "grow",
  },
  "not-ready_team": {
    diagnosisTitle: "Your startup is still in its foundation phase.",
    diagnosisBody:
      "At pre-seed, investors are buying the founders, not the product. Going into investor meetings without the right team structure will cost you credibility that is hard to rebuild. This is the gap to close first.",
    gapLabel: "Your biggest gap: team",
    gapIcon: "users",
    focusTitle: "Build the founding team investors back",
    steps: [
      {
        title: "Find a complementary co-founder",
        body: "Solo founders raise significantly less than teams. Investors want complementary skills and shared commitment. Look for someone who covers your blind spot.",
      },
      {
        title: "Recruit 1-2 advisors with domain expertise",
        body: "At pre-seed, advisor names signal credibility. Find people with relevant experience who commit to regular check-ins. Offer 0.25-0.5% equity with 2-year vesting.",
      },
    ],
    plan: "grow",
  },
  "not-ready_prep": {
    diagnosisTitle: "Your startup is still in its foundation phase.",
    diagnosisBody:
      "You have traction and team building blocks in place, but your story is not packaged for investors. Walking into a meeting without clear materials wastes their time and your opportunity. At pre-seed, investors need a clear problem, a credible team, and a simple capital plan.",
    gapLabel: "Your biggest gap: readiness",
    gapIcon: "file-text",
    focusTitle: "Structure your story and your ask",
    steps: [
      {
        title: "Structure your pitch around problem, team, and market",
        body: "At pre-seed, the deck is simple: what problem, why you, how big the opportunity, and what you need. Investors know the product is early. They want a credible thesis, not a finished platform.",
      },
      {
        title: "Define your use of funds and expected runway",
        body: "How much are you raising, how will you spend it (hires, product, marketing), and how long will it last? The financial conversation at this stage is about capital allocation, not revenue projections.",
      },
    ],
    plan: "grow",
  },
  "pre-seed_traction": {
    diagnosisTitle: "You're positioned for pre-seed, but not seed yet.",
    diagnosisBody:
      "You have a team and early materials. What's missing is proof that your solution addresses a real need. Without that evidence, investor conversations will stall at 'come back when you have traction.'",
    gapLabel: "Your biggest gap: traction",
    gapIcon: "chart-bar",
    focusTitle: "Prove the solution works and people want it",
    steps: [
      {
        title: "Build a working prototype or MVP",
        body: "It doesn't need to be perfect. Investors know the product is early. What they want is evidence that you're building something people respond to.",
      },
      {
        title: "Validate willingness to pay",
        body: "Offer early access at a reduced price to people outside your network. Even a handful of paying strangers is stronger than hundreds of free signups.",
      },
    ],
    plan: "grow",
  },
  "pre-seed_team": {
    diagnosisTitle: "You're positioned for pre-seed, but not seed yet.",
    diagnosisBody:
      "Your product is showing promise, but your team structure does not yet match your ambition. Investors at pre-seed evaluate whether the founding team has the skills to execute. This gap will come up in every conversation.",
    gapLabel: "Your biggest gap: team",
    gapIcon: "users",
    focusTitle: "Strengthen your team for the next phase",
    steps: [
      {
        title: "Close the co-founder or skills gap",
        body: "If you're solo, this is the single highest-impact move. If you have co-founders with overlapping skills, start recruiting for the missing competency.",
      },
      {
        title: "Formalise your company structure",
        body: "Incorporate if you haven't. Clean your cap table. Set up vesting. These are basic hygiene items investors check early, and messy structure raises immediate flags.",
      },
    ],
    plan: "grow",
  },
  "pre-seed_prep": {
    diagnosisTitle: "You're positioned for pre-seed, but not seed yet.",
    diagnosisBody:
      "Your traction and team are ahead of your investor materials. That means you have a real story but no way to tell it effectively. Every week without proper materials is a week of missed introductions.",
    gapLabel: "Your biggest gap: readiness",
    gapIcon: "file-text",
    focusTitle: "Package your story for investor conversations",
    steps: [
      {
        title: "Rebuild your pitch deck around evidence",
        body: "You have real traction now, so your deck should lead with it. Problem validation, solution evidence, team strengths, market opportunity, and a clear ask.",
      },
      {
        title: "Create a clear use of funds and runway plan",
        body: "How much, what for, and what milestones will it reach? At pre-seed, sophisticated projections are not expected. A clear, honest plan is what investors want.",
      },
    ],
    plan: "grow",
  },
  "seed_traction": {
    diagnosisTitle: "You're ready to raise. Let's make sure you close.",
    diagnosisBody:
      "At seed, traction is what separates fundable startups from interesting ideas. Investors want active users, month-over-month growth, and early signs that the business model works.",
    gapLabel: "Area of Improvement: traction",
    gapIcon: "chart-bar",
    focusTitle: "Prove traction and early business model",
    steps: [
      {
        title: "Growth and retention analysis",
        body: "We'll work through your MoM growth, active users, retention, and churn to build the traction narrative investors need at seed.",
      },
      {
        title: "Business model validation",
        body: "We'll review your revenue model, average ticket, and gross margin. Investors want to see how you make money and early signs that it works.",
      },
      {
        title: "Initial unit economics",
        body: "We'll calculate your first CAC and LTV estimates. They don't need to be perfect, but investors expect initial numbers.",
      },
      {
        title: "Competitive positioning",
        body: "We'll map competitors and articulate how you differentiate and plan to scale.",
      },
    ],
    plan: "raise",
  },
  "seed_team": {
    diagnosisTitle: "You're ready to raise. Let's make sure you close.",
    diagnosisBody:
      "At seed, investors evaluate how the team has evolved since launch, whether you've made key hires, and if the structure is ready for what comes next. Strengthening this area before going out will directly affect your valuation.",
    gapLabel: "Area of Improvement: team",
    gapIcon: "users",
    focusTitle: "Build a team that proves execution capacity",
    steps: [
      {
        title: "Team evolution narrative",
        body: "We'll shape the story of how your team has grown, highlighting key hires, role clarity, and capacity to deliver.",
      },
      {
        title: "Key hires roadmap",
        body: "We'll define the critical roles to hire with seed funding, with clear timelines and compensation plans.",
      },
      {
        title: "Advisory board strategy",
        body: "We'll help you recruit advisors with domain expertise that give seed investors confidence.",
      },
      {
        title: "Governance and cap table review",
        body: "We'll review your structure and flag anything that could slow down a deal.",
      },
    ],
    plan: "raise",
  },
  "seed_prep": {
    diagnosisTitle: "You're ready to raise. Let's make sure you close.",
    diagnosisBody:
      "At seed, investors want detailed financials, clear allocation plans, and honest risk assessment. Founders who walk in without this preparation lose deals to founders who have it.",
    gapLabel: "Area of Improvement: readiness",
    gapIcon: "file-text",
    focusTitle: "Prepare your financials and risk narrative",
    steps: [
      {
        title: "Financial projections for 12-24 months",
        body: "We'll build the projections seed investors expect: burn rate, runway, allocation, and growth scenarios.",
      },
      {
        title: "Fundraising ask and allocation",
        body: "We'll define how much you're raising and how every euro maps to milestones that justify the round.",
      },
      {
        title: "Risk mapping and mitigation",
        body: "We'll identify execution risks, customer concentration, and competitive threats with confident answers.",
      },
      {
        title: "Pitch deck stress-testing",
        body: "We'll run your deck through the questions seed investors actually ask.",
      },
    ],
    plan: "raise",
  },
  "series-a_traction": {
    diagnosisTitle: "You're in a strong position for Series A. Let's close it together.",
    diagnosisBody:
      "At Series A, investors are evaluating real data. The central question is: does this model scale predictably? Your traction data needs to tell that story without gaps.",
    gapLabel: "Area of Improvement: traction",
    gapIcon: "chart-bar",
    focusTitle: "Prove scalable, predictable growth",
    steps: [
      {
        title: "Growth consistency proof",
        body: "We'll document MoM growth and build the narrative. 15-20%+ sustained over 3+ months is the reference.",
      },
      {
        title: "Unit economics with real data",
        body: "We'll validate CAC, LTV, payback period, and NRR. LTV/CAC above 3x and NRR above 100% are benchmarks.",
      },
      {
        title: "Cohort and engagement analysis",
        body: "We'll build cohort data proving product-market fit holds at scale.",
      },
      {
        title: "Scalability proof",
        body: "We'll demonstrate that unit economics and gross margin support growth and are defensible.",
      },
    ],
    plan: "raise",
  },
  "series-a_team": {
    diagnosisTitle: "You're in a strong position for Series A. Let's close it together.",
    diagnosisBody:
      "At Series A, the question shifts from 'are these good founders' to 'can these people run a larger operation'. Investors want functional leadership in place, not everything dependent on founders.",
    gapLabel: "Area of Improvement: team",
    gapIcon: "users",
    focusTitle: "Build the leadership layer for scale",
    steps: [
      {
        title: "Functional leadership assessment",
        body: "We'll evaluate VP-level roles and map them to your growth plan.",
      },
      {
        title: "Board composition strategy",
        body: "We'll plan board structure, accommodating investor seats while maintaining founder control.",
      },
      {
        title: "Management culture narrative",
        body: "We'll articulate how your management culture is forming and why it's suited to scale.",
      },
      {
        title: "Compensation and ESOP design",
        body: "We'll structure your option pool and compensation framework for senior talent.",
      },
    ],
    plan: "raise",
  },
  "series-a_prep": {
    diagnosisTitle: "You're in a strong position for Series A. Let's close it together.",
    diagnosisBody:
      "Financial projections need to be detailed and defensible, and the process needs to be efficient. This is where having a partner who knows the mechanics saves you weeks and protects your valuation.",
    gapLabel: "Area of Improvement: readiness",
    gapIcon: "file-text",
    focusTitle: "Optimise for a fast Series A close",
    steps: [
      {
        title: "Detailed projections for 18-36 months",
        body: "We'll build the projections Series A investors expect: burn rate, growth scenarios, and path to breakeven.",
      },
      {
        title: "Full data room audit",
        body: "We'll review every document. At Series A, speed in due diligence signals professionalism.",
      },
      {
        title: "Investor targeting and warm paths",
        body: "We'll build your target list and map warm introductions. Cold outreach converts below 2%.",
      },
      {
        title: "Exit strategy and expansion plan",
        body: "We'll prepare your expansion thesis and exit strategy, both expected at Series A.",
      },
    ],
    plan: "raise",
  },
}

// Helper: get the weakest dimension key from breakdown scores
export function getWeakestDimension(breakdown: { traction: number; team: number; prep: number }): DimKey {
  const { traction, team, prep } = breakdown
  if (traction <= team && traction <= prep) return "traction"
  if (team <= traction && team <= prep) return "team"
  return "prep"
}

// Helper: get the roadmap combo for a given stage and weakest dimension
export function getRoadmap(stageKey: string, weakestDim: DimKey): RoadmapCombo {
  const key = `${stageKey}_${weakestDim}`
  return ROADMAP_DATA[key] || ROADMAP_DATA["not-ready_traction"]
}

// Helper: get secondary dimension actions for non-weak dimensions
export function getSecondaryActions(stageKey: string, weakestDim: DimKey): DimensionActions[] {
  const dimMap: Record<string, { label: string; icon: string }> = {
    traction: { label: "Traction", icon: "chart-bar" },
    team: { label: "Team", icon: "users" },
    prep: { label: "Readiness", icon: "file-text" },
  }

  const allDims: DimKey[] = ["traction", "team", "prep"]
  const stage = stageKey as StageKey

  return allDims
    .filter((d) => d !== weakestDim)
    .map((d) => ({
      label: dimMap[d].label,
      icon: dimMap[d].icon,
      action: SECONDARY_ACTIONS[d][stage],
    }))
}

// Helper: score-based bar color
export function getScoreColor(score: number): string {
  if (score < 35) return "#E24B4A"
  if (score < 80) return "#EF9F27"
  return "#1D9E75"
}
