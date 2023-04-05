import { removePrefix } from "../_utility/keyUtils.ts"

export default function LinkTo({ key }: { key: string }) {
  console.log(key)
  if (key.startsWith("user_")) {
    console.log(key)
    return (
      <li>
        <a href={`/user/${removePrefix(key, "user_")}`}>{key}</a>
      </li>
    )
  } else {
    return (
      <li>
        <a href={`/${removePrefix(key, "team_")}`}>{key}</a>
      </li>
    )
  }
}
