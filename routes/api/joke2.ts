import { HandlerContext, Handlers } from "$fresh/server.ts"
import { JOKES } from "./joke.ts"

export const handler: Handlers = {
  GET(_req: Request, _ctx: HandlerContext) {
    const randomIndex = Math.floor(Math.random() * JOKES.length)
    const body = JOKES[randomIndex]
    return new Response(body)
  },
}
