import { Team, User } from "../_model/_model.ts"
import RemoveButton from "../islands/RemoveButton.tsx"

export default function ListMembers({ result, teamName }: { result: Team; teamName: string }) {
  return (
    <ul class="h-full w-full flex flex-col items-stretch justify-center">
      {Array.from(result.members).map((user: User) => {
        return (
          <li
            class="flex px-2 py-2 border-b-2"
            key={user.githubId}
          >
            <div class="flex w-full items-center ">
              <img class="w-16 h-16 rounded-lg basis-10" src={user.avatarUrl} />
              <a class="text-3xl flex-1" href={`/user/${user.githubId}`}>{user.name}</a>
              <p class="px-2 flex items-center text-sm basis-50">{user.githubId}</p>
              <RemoveButton githubId={user.githubId} teamName={teamName} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
