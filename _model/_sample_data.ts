import { teamKey, userKey } from "../_utility/keyUtils.ts"
import { MaintainerRole, Team, TeamId, User } from "./_model.ts"
import { AdminRole, UserRole } from "./_model.ts"

const user1: User = {
  id: "u1",
  name: "Alice",
  githubId: "alice",
  avatarUrl: "https://avatars.githubusercontent.com/u/00001?v=4",
  teams: ["crosshatch"],
  role: AdminRole,
  membershipStatus: "Accepted",
  eventHistory: [],
}

const user2: User = {
  id: "u2",
  name: "Bob",
  githubId: "mojombo",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  teams: ["crosshatch"],
  role: UserRole,
  membershipStatus: "Accepted",
  eventHistory: [],
}

const user3: User = {
  id: "u3",
  name: "Carol",
  githubId: "defunkt",
  avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
  teams: ["crosshatch"],
  role: UserRole,
  membershipStatus: "Accepted",
  eventHistory: [],
}

const user4: User = {
  id: "u4",
  name: "Dave",
  githubId: "pjhyett",
  avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4",
  teams: ["crosshatch"],
  role: MaintainerRole,
  membershipStatus: "Accepted",
  eventHistory: [],
}

const user5: User = {
  id: "u5",
  name: "Eve",
  githubId: "wycats",
  avatarUrl: "https://avatars.githubusercontent.com/u/4?v=4",
  teams: ["crosshatch"],
  role: UserRole,
  membershipStatus: "Accepted",
  eventHistory: [],
}

export const seedTeam: Team = {
  id: "t1" as TeamId,
  name: "crosshatch",
  members: [
    user1,
    user2,
    user3,
    user4,
    user5,
  ],
  eventHistory: [],
  visiblity: true,
}

localStorage.clear()

// Seed team
localStorage.setItem(
  teamKey("crosshatch"),
  JSON.stringify(seedTeam, (_, value) => value instanceof Set ? [...value] : value),
)

// Seed users
localStorage.setItem(
  userKey(user1.githubId),
  JSON.stringify(user1),
)
localStorage.setItem(
  userKey(user2.githubId),
  JSON.stringify(user2),
)
localStorage.setItem(
  userKey(user3.githubId),
  JSON.stringify(user3),
)
localStorage.setItem(
  userKey(user4.githubId),
  JSON.stringify(user4),
)
localStorage.setItem(
  userKey(user5.githubId),
  JSON.stringify(user5),
)
