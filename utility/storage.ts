import { Team, User } from "../_model/_model.ts"
import {
  GetTeam,
  GetUser,
  PutTeam,
  PutUser,
  TableNameTeam,
  TableNameUser,
  teamClient,
  userClient,
} from "./ddb-client.ts"

export function ddbSetItem(_key: string, item: User | Team) {
  if (item.type === "user") {
    return userClient.send(
      new PutUser({ TableName: TableNameUser, Item: item }),
    )
  } else {
    return teamClient.send(
      new PutTeam(
        { TableName: TableNameTeam, Item: item },
      ),
    )
  }
}

export function ddbGetUser(key: string) {
  return userClient.send(
    new GetUser({ TableName: TableNameUser, Key: { githubId: key } }),
  )
}

export function ddbGetTeam(key: string) {
  return teamClient.send(
    new GetTeam({ TableName: TableNameTeam, Key: { name: key } }),
  )
}
