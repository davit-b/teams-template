import { Handlers, PageProps } from "$fresh/server.ts"
import { User } from "../../_model/_model.ts"
import { userKey } from "../../_utility/keyUtils.ts"

interface Data {
  user: User
}

export const handler: Handlers = {
  GET(_, ctx) {
    const local = localStorage.getItem(userKey(ctx.params.user))
    const user = (local) ? JSON.parse(local) : null
    if (user) {
      return ctx.render({ user })
    }
    return ctx.render()
  },
}

export default function Page({ data, params }: PageProps<Data>) {
  const { user } = data
  return (
    <div class="flex w-screen h-screen justify-center items-center">
      <div class="flex flex-col w-2/3 h-2/3 bg-red-200 justify-center items-center">
        <img src={user.avatarUrl} width={200} height={200} />
        <span>github:&nbsp;{user.githubId}</span>
        <span>id:&nbsp;{user.id}</span>
        <span>name:&nbsp;{user.name}</span>
        <div class="flex">
          teams:&nbsp;{user.teams.map((team) => (
            <a class="text-blue-500" href={`/${team}`}>{team}&nbsp;&nbsp;</a>
          ))}
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
