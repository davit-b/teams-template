import { Handlers } from "$fresh/server.ts"
import { AdminRole, NewUserInput, Team, User } from "../../_model/_model.ts"
import { ddbGetTeam, ddbGetUser, ddbSetItem } from "../../utility/storage.ts"
import "https://deno.land/x/dotenv@v3.2.2/load.ts"

const GH_TOKEN = Deno.env.get("gh_token")!

interface GithubFetchResponse {
  name: string
  login: string
  avatar_url: string
}

async function getOrCreateUser(githubId: string): Promise<User | undefined> {
  const ddbResult = await ddbGetUser(githubId)
  if (ddbResult.Item) {
    return ddbResult.Item
  } else {
    const fetchResult: GithubFetchResponse = await fetch(
      `https://api.github.com/users/${githubId}`,
      {
        headers: {
          Authorization: `token ${GH_TOKEN}`,
        },
      },
    ).then((v) => v.json())

    const newUser: User = {
      type: "user",
      id: crypto.randomUUID(),
      name: fetchResult.name,
      githubId: fetchResult.login,
      avatarUrl: fetchResult.avatar_url,
      teams: [],
      role: AdminRole,
      membershipStatus: "Invited",
      eventHistory: [],
    }

    if (newUser.githubId) {
      await ddbSetItem(githubId, newUser)
      return newUser
    } else {
      return undefined
    }
  }
}

async function createNewTeam(teamName: string) {
  const newTeam: Team = {
    type: "team",
    id: crypto.randomUUID(),
    name: teamName,
    members: [],
    eventHistory: [],
    visiblity: true,
  }
  await ddbSetItem(teamName, newTeam)
  return newTeam
}

export const handler: Handlers = {
  async POST(req, _ctx) {
    const input: NewUserInput = await req?.json()
    const newUser = await getOrCreateUser(input.githubId)
    if (newUser === undefined) {
      return new Response(null, {
        status: 406,
      })
    }

    const ddbItem = await ddbGetTeam(input.teamName)
    const result: Team = (ddbItem.Item)
      ? ddbItem.Item
      : await createNewTeam(input.teamName)

    try {
      if (result.members.some((v) => v.githubId === input.githubId)) {
        console.error("User already exists")
        return new Response(JSON.stringify(result), {
          status: 400,
        })
      } else {
        // Update team's memberList
        const updatedTeam: Team = {
          ...result,
          members: [...result.members, newUser],
        }
        await ddbSetItem(input.teamName, updatedTeam)

        // Update user's teamList
        await addTeamToUser(input.teamName, input.githubId)

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
  const ddbResult = await ddbGetUser(githubId)
  if (ddbResult.Item) {
    const user: User = ddbResult.Item
    const updatedUser = {
      ...user,
      teams: [...user.teams, teamName],
    }
    await ddbSetItem(githubId, updatedUser)
  } else {
    throw new Error("Failure adding team to user")
  }
}
