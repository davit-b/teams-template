import { HandlerContext, Handlers } from "$fresh/server.ts"
import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts"
import { AdminRole, NewUserInput, Team, User } from "../../_model/_model.ts"

const env = await load()
const gh_token = env["gh_token"]

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    const input: NewUserInput = await req?.json()
    const newUser: User = await fetch(`https://api.github.com/users/${input.githubId}`, {
      headers: {
        Authorization: `token ${gh_token}`,
      },
    }).then((v) => v.json()).then((user) => {
      return {
        id: crypto.randomUUID(),
        name: user.name,
        githubId: user.login,
        avatarUrl: user.avatar_url,
        teams: [input.teamId],
        role: AdminRole,
        membershipStatus: "Invited",
        eventHistory: [],
      }
    })

    const localItem = localStorage.getItem(input.teamName)
    const result: Team = (localItem)
      ? JSON.parse(localItem)
      : createNewTeam(input.teamName)

    if (result.members.some((v) => v.githubId === input.githubId)) {
      console.log("User already exists")
      return new Response(JSON.stringify(result), {
        status: 403,
      })
    } else {
      const updatedTeam: Team = {
        ...result,
        members: [...result.members, newUser],
      }
      localStorage.setItem(input.teamName, JSON.stringify(updatedTeam))
      return new Response(JSON.stringify(result), {
        status: 200,
      })
    }
  },
}

function createNewTeam(teamName: string) {
  localStorage.setItem(
    teamName,
    JSON.stringify({
      id: crypto.randomUUID(),
      name: teamName,
      members: [],
      eventHistory: [],
      teams: [],
      visiblity: true,
    }),
  )
}
