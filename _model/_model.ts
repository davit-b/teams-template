export type AdminRole = typeof AdminRole
export const AdminRole = "AdminRole" as const

export type UserRole = typeof UserRole
export const UserRole = "UserRole" as const

export type MaintainerRole = typeof MaintainerRole
export const MaintainerRole = "MaintainerRole" as const

export type Role = AdminRole | UserRole | MaintainerRole
// Admin can add/remove anyone else, including other admins.

export type TeamId = string
export type TeamName = string

export interface Team {
  id: TeamId
  name: TeamName
  members: User[]
  eventHistory: Event[]
  visiblity: boolean
}

export type Event =
  & {
    date: Date
  }
  & ({
    type: "TeamInvitation"
    from: User
    to: User
  } | {
    type: "SomeOtherType"
  })

export interface User {
  id: string
  name: string
  githubId: string
  avatarUrl: string
  teams: TeamName[]
  role: Role
  membershipStatus: "Invited" | "Accepted"
  eventHistory: Event[]
}

export type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface NewUserInput {
  githubId: string
  teamId: TeamId
  teamName: string
}

export interface InviteUserAction {
  newUser: NewUserInput
  toTeam: SafeOmit<Team, "eventHistory" | "members" | "visiblity">
  inviter: SafeOmit<User, "eventHistory" | "membershipStatus" | "teams" | "avatarUrl" | "name">
}

export type InviteUserCallback = () => void

export interface RemoveInput {
  githubId: string
  teamName: string
}
