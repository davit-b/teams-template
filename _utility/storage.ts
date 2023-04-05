import { Team, User } from "../_model/_model.ts"
import {
  GetTeam,
  GetUser,
  PutTeam,
  PutUser,
  TableNameTeam,
  TableNameUser,
  team_client,
  user_client,
} from "./ddb-client.ts"

function isUser(item: User | Team): item is User {
  return (item as User).githubId !== undefined
}
function isTeam(item: User | Team): item is Team {
  return (item as Team).members !== undefined
}

export function ddbSetItem(key: string, item: User | Team) {
  console.log("ddbSetItem: ", key)
  if (isUser(item)) {
    return user_client.send(
      new PutUser({ TableName: TableNameUser, Item: item }),
    )
  } else if (isTeam(item)) {
    return user_client.send(
      new PutTeam(
        { TableName: TableNameTeam, Item: item },
      ),
    )
  } else {
    throw new Error("Error in ddb set item")
  }
}

export function ddbGetUser(key: string) {
  console.log("ddbGetUser ", key)
  if (key) {
    return user_client.send(
      new GetUser({ TableName: TableNameUser, Key: { githubId: key } }),
    )
  } else {
    throw new Error("Error in ddb get item")
  }
}

export function ddbGetTeam(key: string) {
  console.log("ddbGetTeam ", key)
  if (key) {
    return team_client.send(
      new GetTeam({ TableName: TableNameTeam, Key: { name: key } }),
    )
  } else {
    throw new Error("Error in ddb get item")
  }
}
