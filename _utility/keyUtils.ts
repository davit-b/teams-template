// These utilities are helpful in the case that your DDB Primary Key
// is different. Keep this here to simplify forks and refactors
export function teamKey(team: string) {
  return `${team}`
}

export function userKey(user: string) {
  return `${user}`
}

export function removePrefix(s: string, prefix: string) {
  s.startsWith(prefix) ? s.slice(prefix.length) : s
}
