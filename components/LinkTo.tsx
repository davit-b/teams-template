import { removePrefix } from "../_utility/keyUtils.ts"

export default function LinkTo({ data }: { data: string }) {
  console.log(data)
  if (data.startsWith("user_")) {
    console.log(data)
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
