import { Handlers } from "https://deno.land/x/fresh@1.1.4/server.ts"
import { RemoveInput, Team, User } from "../../_model/_model.ts"
import { teamKey, userKey } from "../../_utility/keyUtils.ts"

export const handler: Handlers = {
  async POST(req, _) {
    const input: RemoveInput = await req?.json()

    try {
      removeFromTeam(input.teamName, input.githubId)
      updateUserFields(input.teamName, input.githubId)

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

function removeFromTeam(teamName: string, githubId: string) {
  const item = localStorage.getItem(teamKey(teamName))
  const team: Team = (item) ? JSON.parse(item) : null

  if (team) {
    // Remove user from team
    const decreasedMembers = team.members.filter((user) => user.githubId !== githubId)
    const updatedTeam = {
      ...team,
      members: decreasedMembers,
    }
    localStorage.setItem(teamKey(teamName), JSON.stringify(updatedTeam))
  } else {
    throw new Error("Team does not exist in local storage. This should not happen")
  }
}

function updateUserFields(teamName: string, githubId: string) {
  const item = localStorage.getItem(userKey(githubId))
  const user: User = (item) ? JSON.parse(item) : null

  console.log("updateUserFields called")

  if (user) {
    // Remove the team name from User's teams field
    const updatedUser = {
      ...user,
      teams: user.teams.filter((n) => n !== teamName),
    }
    localStorage.setItem(userKey(githubId), JSON.stringify(updatedUser))
  } else {
    throw new Error("User does not exist in local storage. Critical error")
  }
}
