import { Handlers, PageProps } from "$fresh/server.ts"
import { Team } from "../_model/_model.ts"
import ActionBox from "../components/ActionBox.tsx"
import Footer from "../components/Footer.tsx"
import ListMembers from "../components/ListMembers.tsx"
import Nav from "../components/Nav.tsx"
import TeamInfo from "../components/TeamInfo.tsx"
import { ddbGetTeam } from "../utility/storage.ts"
// @deno-types="https://deno.land/x/fuse@v6.4.1/dist/fuse.d.ts"
import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js"

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url)
    const memberQuery = url.searchParams.get("name") || ""
    const ddbTeam = await ddbGetTeam(ctx.params.team)
    const result: Team = (ddbTeam.Item)
      ? ddbTeam.Item
      : {
        type: "team",
        id: crypto.randomUUID(),
        name: ctx.params.team,
        members: [],
        eventHistory: [],
        visiblity: true,
      }
    const fuse = new Fuse(result.members, { keys: ["githubId"] })

    if (memberQuery) {
      return ctx.render({
        result: {
          ...result,
          members: fuse.search(memberQuery).map((e) => e.item),
        },
        memberQuery,
      })
    } else {
      return ctx.render({ result, memberQuery })
    }
  },
}

interface Data {
  result: Team
  memberQuery: string
}

export default function Page({ data, params }: PageProps<Data>) {
  const { result, memberQuery } = data

  const teamName = params.team
  return (
    <div class="flex flex-col h-screen justify-between">
      <Nav />
      <main class="rounded-lg mb-auto px-2">
        <div class="flex w-full h-full ">
          <div class="w-1/4 flex flex-col justify-start items-center px-4 py-4 bg-gray-100 rounded-3xl">
            <TeamInfo teamName={teamName} />
          </div>

          <div class="w-3/4 flex flex-col m-1">
            <div class="m-1 flex flex-col items-stretch">
              <ActionBox teamId={result.id} teamName={teamName} memberQuery={memberQuery} />
              <ListMembers result={result} teamName={teamName} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
