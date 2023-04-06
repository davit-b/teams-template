import { Handlers, PageProps } from "$fresh/server.ts"
import { User } from "../../_model/_model.ts"
import { userKey } from "../../_utility/keyUtils.ts"
import { ddbGetUser } from "../../_utility/storage.ts"

interface Data {
  user: User
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const ddbResult = await ddbGetUser(userKey(ctx.params.user))
    if (ddbResult.Item) {
      return ctx.render({ user: ddbResult.Item })
    }
    return ctx.render()
  },
}

export default function Page({ data, params }: PageProps<Data>) {
  const { user } = data
  return (
    <div class="flex w-screen h-screen justify-center items-center">
      <div class="flex flex-col w-2/3 h-2/3 justify-center items-center">
        <img src={user.avatarUrl} width={200} height={200} />
        <span>github:&nbsp;{user.githubId}</span>
        <span>id:&nbsp;{user.id}</span>
        <span>name:&nbsp;{user.name}</span>
        <div class="flex">
          teams:&nbsp;{user.teams.map((team) => <a class="" href={`/${team}`}>{team}&nbsp;&nbsp;
          </a>)}
        </div>
        <span>{user.role}</span>
        <span>{user.membershipStatus}</span>
        <div>
          EventHistory[]
        </div>
      </div>
    </div>
  )
}
