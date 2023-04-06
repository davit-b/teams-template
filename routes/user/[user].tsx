import { Handlers, PageProps } from "$fresh/server.ts"
import { User } from "../../_model/_model.ts"
import { userKey } from "../../_utility/keyUtils.ts"
import { ddbGetUser } from "../../_utility/storage.ts"

export const handler: Handlers = {
  async GET(_, ctx) {
    const ddbResult = await ddbGetUser(userKey(ctx.params.user))
    if (!ddbResult.Item) {
      return ctx.renderNotFound()
    }
    return ctx.render({ user: ddbResult.Item })
  },
}

export default function Page({ data }: PageProps<{ user: User }>) {
  const { user } = data
  return (
    <div class="flex w-screen h-screen justify-center items-center">
      <div class="flex flex-col w-2/3 h-2/3 justify-center items-center">
        <img class="w-96 h-96 rounded-2xl" src={user.avatarUrl} />
        <a class="prose prose-2xl link link-primary" href={`https://github.com/${user.githubId}`}>
          {user.githubId}
        </a>
        <h2 class="prose prose-2xl">{user.name}</h2>
        <div class="flex items-start noprose border-t-2">
          <h3 class="prose prose-xl">Teams: &nbsp;&nbsp;&nbsp;&nbsp;</h3>
          <div class="flex flex-col items-start w-28 pt-2">
            {user.teams.map((team) => <a class="link link-primary" href={`/${team}`}>{team}</a>)}
          </div>
        </div>
      </div>
    </div>
  )
}
