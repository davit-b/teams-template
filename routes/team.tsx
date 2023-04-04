import { Head } from "$fresh/runtime.ts"
import { Handlers, PageProps } from "$fresh/server.ts"
import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts"

const bb = "border-2 border-black"

const database: Record<string, string[]> = {
  "10x-team": [
    "davit-b",
    "kentcdodds",
    "harrysolovay",
    "tjjfvi",
    "linonetwo",
    "nythrox",
    "dje",
    "insipx",
  ],
  "5x-team": ["davit-b", "davit-b"],
}

interface User {
  login: string
  name: string
  avatar_url: string
}

const env = await load()
const gh_token = env["gh_token"]

function buildGithubCalls(teamMembers: string[]): Promise<User[]> {
  return Promise.all(
    teamMembers.map((username) =>
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${gh_token}`,
        },
      }).then((v) => v.json()).then((user) => {
        return {
          avatar_url: user.avatar_url ?? "no_url",
          name: user.name ?? "no_name",
          login: user.login ?? "no_login",
        }
      })
    ),
  )
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url)
    const team = url.searchParams.get("team") || ""
    const memberQuery = url.searchParams.get("name") || ""
    const teamMembers = database[team]
    const results = await buildGithubCalls(teamMembers)
    const filteredResults = results.filter((user) => user.name.toLowerCase().includes(memberQuery))
    console.log(filteredResults)

    return ctx.render({ results: filteredResults, team, memberQuery })
  },
}

interface Data {
  results: User[]
  team: string
  memberQuery: string
}

export default function Page({ data }: PageProps<Data>) {
  const { results, team, memberQuery } = data
  return (
    <div class="h-screen bg-gray-200 p-1">
      <Head>
        <title>teams</title>
      </Head>
      <nav class="h-8">
        <a class="px-4 py-2 mt-2" href="/">Home</a>
      </nav>
      <main class="h-5/6">
        <div class="flex w-full h-full">
          <div class="w-1/4">Team</div>
          <div class={`w-3/4 flex-col ${bb}`}>
            Team Manage app
            <div class={bb}>Tab: Members</div>
            <div class={`${bb} m-1 flex flex-col`}>
              <div class="flex justify-between p-2 border-b-2 border-black">
                <form>
                  <input type="hidden" name="team" value={team} />
                  <input type="text" name="name" value={memberQuery} placeholder="Search by name">
                  </input>
                  <button type="submit" />
                </form>

                <button class="bg-blue-400 px-2 py-1 rounded-lg">Add member</button>
              </div>
              <div class="h-full w-full flex items-center">
                <ul>
                  {results.map((user: User) => {
                    return (
                      <li class="flex w-full text-gray-600 px-2 py-2 border-b-2" key={user.login}>
                        <img src={user.avatar_url} width={40} height={40} />
                        <h1 class="text-3xl">{user.name}</h1>
                        <p class="px-2 flex items-center text-sm">login: {user.login}</p>
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
  )
}
