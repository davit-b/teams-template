import { HandlerContext, Handlers } from "$fresh/server.ts"
import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts"
import { AdminRole, NewUserInput, Team, User } from "../../_model/_model.ts"
import { teamKey, userKey } from "../../_utility/keyUtils.ts"

const env = await load()
const gh_token = env["gh_token"]

async function getOrCreateUser(githubId: string, teamName: string): Promise<User> {
  const localResult = localStorage.getItem(userKey(githubId))
  if (localResult) {
    return JSON.parse(localResult)
  } else {
    const newUser: User = await fetch(`https://api.github.com/users/${githubId}`, {
      headers: {
        Authorization: `token ${gh_token}`,
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
    localStorage.setItem(userKey(githubId), JSON.stringify(newUser))

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
  localStorage.setItem(
    teamKey(teamName),
    JSON.stringify(newTeam),
  )
  return newTeam
}

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    const input: NewUserInput = await req?.json()
    const newUser = await getOrCreateUser(input.githubId, input.teamName)

    const localItem = localStorage.getItem(teamKey(input.teamName))
    const result: Team = (localItem)
      ? JSON.parse(localItem)
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
        localStorage.setItem(teamKey(input.teamName), JSON.stringify(updatedTeam))

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

function addTeamToUser(teamName: string, githubId: string) {
  const localResult = localStorage.getItem(userKey(githubId))
  if (localResult) {
    const user: User = JSON.parse(localResult)
    const updatedUser = {
      ...user,
      teams: [...user.teams, teamName],
    }
    localStorage.setItem(userKey(githubId), JSON.stringify(updatedUser))
  } else {
    throw new Error("Failure adding team to user")
  }
}
