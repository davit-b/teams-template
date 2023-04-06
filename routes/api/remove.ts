import { Handlers } from "https://deno.land/x/fresh@1.1.4/server.ts"
import { RemoveInput } from "../../_model/_model.ts"
import { teamKey, userKey } from "../../_utility/keyUtils.ts"
import { ddbGetTeam, ddbGetUser, ddbSetItem } from "../../_utility/storage.ts"

export const handler: Handlers = {
  async POST(req, _) {
    const input: RemoveInput = await req?.json()

    try {
      await removeFromTeam(input.teamName, input.githubId)
      await updateUserFields(input.teamName, input.githubId)

      return new Response(null, {
        status: 200,
      })
    } catch (e) {
      console.error("Error removing target: ", input, "from storage", e)
      return new Response(null, {
        status: 400,
      })
    }
  },
}

async function removeFromTeam(teamName: string, githubId: string) {
  const item = await ddbGetTeam(teamKey(teamName))

  if (item.Item) {
    // Remove user from team
    const decreasedMembers = item.Item.members.filter((user) => user.githubId !== githubId)
    const updatedTeam = {
      ...item.Item,
      members: decreasedMembers,
    }
    await ddbSetItem(teamKey(teamName), updatedTeam)
  } else {
    throw new Error("Team does not exist in local storage. This should not happen")
  }
}

async function updateUserFields(teamName: string, githubId: string) {
  const ddbResult = await ddbGetUser(userKey(githubId))

  if (ddbResult.Item) {
    const user = ddbResult.Item
    // Remove the team name from User's teams field
    const updatedUser = {
      ...user,
      teams: user.teams.filter((n) => n !== teamName),
    }
    await ddbSetItem(userKey(githubId), updatedUser)
  } else {
    throw new Error("User does not exist in local storage. Critical error")
  }
}
