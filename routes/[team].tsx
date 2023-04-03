import { Head } from "$fresh/runtime.ts"
import { Handlers, PageProps } from "$fresh/server.ts"
import { Team, User } from "../_model/_model.ts"
import ButtonModal from "../islands/ButtonModal.tsx"

const bb = "border-2 border-black"

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const memberQuery = url.searchParams.get("name") || ""
    const result = JSON.parse(localStorage.getItem("test4") ?? "")
    return ctx.render({ result, memberQuery })
  },
}

interface Data {
  result: Team
  memberQuery: string
}

export default function Page({ data, params }: PageProps<Data>) {
  const { result, memberQuery } = data

  console.log(result)
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
          <div class="flex w-full h-full">
            <div class={`${bb} w-1/4`}>Team {teamName}</div>
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
                  <ButtonModal />
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
                          <h1 class="text-3xl">{user.name}</h1>
                          <p class="px-2 flex items-center text-sm">login: {user.githubId}</p>
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
