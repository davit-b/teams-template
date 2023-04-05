// @deno-types="https://esm.sh/v106/@aws-sdk/client-dynamodb@3.262.0/dist-types/index.d.ts"
import {
  DynamoDBClient,
} from "https://esm.sh/v106/@aws-sdk/client-dynamodb@3.262.0/es2022/client-dynamodb.js"
// @deno-types="https://esm.sh/v106/@aws-sdk/lib-dynamodb@3.262.0/dist-types/index.d.ts"
import { DynamoDBDocument } from "https://esm.sh/v106/@aws-sdk/lib-dynamodb@3.262.0/es2022/lib-dynamodb.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/document-client-v3.d.ts"
import { TypeSafeDocumentClientV3 } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/document-client-v3.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/put-document-command.d.ts"
import { TypeSafePutDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/put-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/get-document-command.d.ts"
import { TypeSafeGetDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/get-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/delete-document-command.d.ts"
import { TypeSafeDeleteDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/delete-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/query-document-command.d.ts"
import { TypeSafeQueryDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/query-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/scan-document-command.d.ts"
import { TypeSafeScanDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/scan-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/update-document-command.d.ts"
import { TypeSafeUpdateDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/update-document-command.js"

import { Team, User } from "../_model/_model.ts"
import "https://deno.land/x/dotenv/load.ts"

export const Region = "us-east-1"

export const team_client = DynamoDBDocument.from(
  new DynamoDBClient({
    region: Region,
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
    },
  }),
) as unknown as TypeSafeDocumentClientV3<Team, "id">

export const PutTeam = TypeSafePutDocumentCommand<Team>()
export const GetTeam = TypeSafeGetDocumentCommand<Team, "name", undefined>()
// export const Delete = TypeSafeDeleteDocumentCommand<Team, "id", undefined>()
// export const Query = TypeSafeQueryDocumentCommand<Team>()
// export const Scan = TypeSafeScanDocumentCommand<Team>()
// export const Update = TypeSafeUpdateDocumentCommand<Team, "id", undefined>()

export const user_client = DynamoDBDocument.from(
  new DynamoDBClient({
    region: Region,
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
    },
  }),
) as unknown as TypeSafeDocumentClientV3<User, "id">

export const PutUser = TypeSafePutDocumentCommand<User>()
export const GetUser = TypeSafeGetDocumentCommand<User, "githubId", undefined>()

export const TableNameTeam = "construct_team_table"
export const TableNameUser = "construct_user_table"
