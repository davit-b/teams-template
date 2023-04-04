import { HandlerContext, Handlers } from "$fresh/server.ts"
import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts"
import { AdminRole, NewUserInput, Team, User } from "../../_model/_model.ts"

const env = await load()
const gh_token = env["gh_token"]

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    // const url = new URL(req.url)
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

    const result: Team = JSON.parse(localStorage.getItem(input.teamName) ?? "")
    const updatedTeam: Team = {
      ...result,
      members: [...result.members, newUser],
    }

    console.log(input.teamName)
    localStorage.setItem(input.teamName, JSON.stringify(updatedTeam))

    console.log(updatedTeam)

    return new Response(JSON.stringify(newUser))
  },
}
