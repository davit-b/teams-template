import { HandlerContext, Handlers } from "$fresh/server.ts"
import { AdminRole, NewUserInput, Team, User } from "../../_model/_model.ts"
import { teamKey, userKey } from "../../_utility/keyUtils.ts"
import { ddbGetTeam, ddbGetUser, ddbSetItem } from "../../_utility/storage.ts"
import "https://deno.land/x/dotenv@v3.2.2/load.ts"

const GH_TOKEN = Deno.env.get("gh_token")!

async function getOrCreateUser(githubId: string): Promise<User> {
  const ddbResult = await ddbGetUser(userKey(githubId))
  if (ddbResult.Item) {
    return ddbResult.Item
  } else {
    const newUser: User = await fetch(`https://api.github.com/users/${githubId}`, {
      headers: {
        Authorization: `token ${GH_TOKEN}`,
      },
    }).then((v) => v.json()).then((user) => {
      return {
        id: crypto.randomUUID(),
        name: user.name,
        githubId: user.login,
        avatarUrl: user.avatar_url,
        teams: [],
        role: AdminRole,
        membershipStatus: "Invited",
        eventHistory: [],
      }
    })
    ddbSetItem(userKey(githubId), newUser)

    return newUser
  }
}

function createNewTeam(teamName: string) {
  const newTeam = {
    id: crypto.randomUUID(),
    name: teamName,
    members: [],
    eventHistory: [],
    teams: [],
    visiblity: true,
  }
  ddbSetItem(teamKey(teamName), newTeam)
  return newTeam
}

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    const input: NewUserInput = await req?.json()
    const newUser = await getOrCreateUser(input.githubId)

    const ddbItem = await ddbGetTeam(teamKey(input.teamName))
    const result: Team = (ddbItem.Item)
      ? ddbItem.Item
      : createNewTeam(input.teamName)

    try {
      if (result.members.some((v) => v.githubId === input.githubId)) {
        console.error("User already exists")
        return new Response(JSON.stringify(result), {
          status: 403,
        })
      } else {
        // Update team's memberList
        const updatedTeam: Team = {
          ...result,
          members: [...result.members, newUser],
        }
        ddbSetItem(teamKey(input.teamName), updatedTeam)

        // Update user's teamList
        addTeamToUser(input.teamName, input.githubId)

        return new Response(JSON.stringify(result), {
          status: 200,
        })
      }
    } catch (e) {
      console.error("Something went wrong in updating the team or the teams field in user.", e)
      return new Response(null, {
        status: 500,
      })
    }
  },
}

async function addTeamToUser(teamName: string, githubId: string) {
  const ddbResult = await ddbGetUser(userKey(githubId))
  if (ddbResult.Item) {
    const user: User = ddbResult.Item
    const updatedUser = {
      ...user,
      teams: [...user.teams, teamName],
    }
    ddbSetItem(userKey(githubId), updatedUser)
  } else {
    throw new Error("Failure adding team to user")
  }
}
