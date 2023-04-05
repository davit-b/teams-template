import { removePrefix } from "../_utility/keyUtils.ts"

export default function LinkTo({ data }: { data: string }) {
  if (data.startsWith("user_")) {
    return (
      <li>
        <a href={`/user/${removePrefix(data, "user_")}`}>{data}</a>
      </li>
    )
  } else {
    return (
      <li>
        <a href={`/${removePrefix(data, "team_")}`}>{data}</a>
      </li>
    )
  }
}
