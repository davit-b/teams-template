import { Head } from "$fresh/runtime.ts"
import { Handlers, PageProps } from "$fresh/server.ts"
// import * as f from "https://esm.sh/fast-fuzzy@1.12.0"
import { Team, User } from "../_model/_model.ts"
import { teamKey } from "../_utility/keyUtils.ts"
import ButtonModal from "../islands/ButtonModal.tsx"
import RemoveButton from "../islands/RemoveButton.tsx"
// @deno-types="https://deno.land/x/fuse@v6.4.1/dist/fuse.d.ts"
import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js"

const bb = "border-2 border-black"
// const FUZZY_SEARCH_WEIGHT = 0.8

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const memberQuery = url.searchParams.get("name") || ""
    const localValue = localStorage.getItem(teamKey(ctx.params.team))
    const result: Team = (localValue)
      ? JSON.parse(localValue)
      : {
        id: crypto.randomUUID(),
        name: ctx.params.team,
        members: [],
        eventHistory: [],
        teams: [],
        visiblity: true,
      }
    const fuse = new Fuse(result.members, { keys: ["githubId"] })

    // Fuzzy search via https://github.com/EthanRutherford/fast-fuzzy
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
    <div>
      <div class="h-screen bg-gray-200 p-1">
        <Head>
          <title>teams</title>
        </Head>
        <nav class="h-8">
          <a class="px-4 py-2 mt-2" href="/">Home</a>
        </nav>
        <main class="h-5/6">
          <div class="flex w-full h-full ">
            <div class={`${bb} w-1/4 flex flex-col justify-start items-center`}>
              <p class="font-bold text-2xl">{teamName}</p>
              <img
                src="/logo.svg"
                class="w-32 h-32"
                alt="the fresh logo: a sliced lemon dripping with juice"
              />
            </div>
            <div class={`w-3/4 flex-col ${bb}`}>
              Team Manage app
              <div class={bb}>Tab: Members</div>
              <div class={`${bb} m-1 flex flex-col`}>
                <div class="flex justify-between p-2 border-b-2 border-black">
                  <form>
                    <input
                      type="text"
                      name="name"
                      value={memberQuery}
                      placeholder="Search by name"
                    >
                    </input>
                    <button type="submit" />
                  </form>
                  <ButtonModal teamId={result.id} teamName={teamName} />
                </div>
                <div class="h-full w-full flex items-center">
                  <ul>
                    {Array.from(result.members).map((user: User) => {
                      return (
                        <li
                          class="flex w-full text-gray-600 px-2 py-2 border-b-2"
                          key={user.githubId}
                        >
                          <img src={user.avatarUrl} width={40} height={40} />
                          <a class="text-3xl" href={`/user/${user.githubId}`}>{user.name}</a>
                          <p class="px-2 flex items-center text-sm">login: {user.githubId}</p>
                          <RemoveButton githubId={user.githubId} teamName={teamName} />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer class="font-serif">
          <p>2023 Copyright Davit</p>
        </footer>
      </div>
    </div>
  )
}
