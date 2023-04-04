import { Handlers } from "https://deno.land/x/fresh@1.1.4/server.ts"
import { RemoveInput, Team } from "../../_model/_model.ts"

export const handler: Handlers = {
  async POST(req, _) {
    const input: RemoveInput = await req?.json()

    try {
      const item = localStorage.getItem(input.teamName)
      const team: Team = (item) ? JSON.parse(item) : null

      if (team) {
        const decreasedMembers = team.members.filter((user) => user.githubId !== input.githubId)
        const updatedTeam = {
          ...team,
          members: decreasedMembers,
        }
        localStorage.setItem(input.teamName, JSON.stringify(updatedTeam))
      } else {
        throw new Error("Team does not exist in local storage. Should not happen")
      }

      return new Response(null, {
        status: 200,
      })
    } catch (e) {
      console.error("Error removing target: ", input, "from localStorage", e)
      return new Response(null, {
        status: 400,
      })
    }
  },
}
