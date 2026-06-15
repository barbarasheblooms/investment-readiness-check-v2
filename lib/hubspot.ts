const HS_PORTAL_ID = "147594085"
const HS_FORM_ID = "c1339ff0-331d-4373-b23f-20392c034f24"

export interface HubSpotLead {
  name: string
  email: string
  startup_name: string
  score: number
  stage: string
  plan: string
  traction: number
  team: number
}

export async function saveHubSpotLead(data: HubSpotLead): Promise<boolean> {
  if (!HS_PORTAL_ID || !HS_FORM_ID) return false

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: data.name },
            { name: "email", value: data.email },
            { name: "company", value: data.startup_name },
            { name: "quiz_score", value: String(data.score) },
            { name: "quiz_stage", value: data.stage },
            { name: "quiz_plan", value: data.plan },
            { name: "score_traction", value: String(data.traction) },
            { name: "score_team", value: String(data.team) },
          ],
        }),
      }
    )

    if (!response.ok) {
      console.error("HubSpot error:", await response.text())
      return false
    }

    return true
  } catch (e) {
    console.error("HubSpot:", e)
    return false
  }
}
