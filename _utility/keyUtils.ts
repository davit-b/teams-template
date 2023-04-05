const TEAM_PREFIX = "team_"
const USER_PREFIX = "user_"

export function teamKey(team: string) {
  return `${team}`
}

export function userKey(user: string) {
  return `${user}`
}

export function removePrefix(s: string, prefix: string) {
  if (s.startsWith(prefix)) {
    return s.slice(prefix.length)
  }
  return s
}
