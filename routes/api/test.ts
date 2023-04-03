import { Handlers } from "$fresh/server.ts"
import { sampleTeam } from "../../_model/_sample_data.ts"

export const handler: Handlers = {
  GET() {
    const key = "test"
    localStorage.setItem(key, JSON.stringify(sampleTeam))
    console.log("Storing sample team under key: ", key)
    return new Response(null)
  },
}
