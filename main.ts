import { Hono } from '@hono/hono'
import { logger } from '@hono/hono/logger'
import { cors } from "@hono/hono/cors"
import { requestId, type RequestIdVariables } from "@hono/hono/request-id"
import * as rawg from "./src/rawg/mod.ts";

const app = new Hono<{
  Variables: RequestIdVariables
}>()

app.use(logger());
app.use(requestId())
app.use(cors({
  origin: Deno.env.get("CORS_ORIGIN")!
}))

app.post("/get", async (ctx) => {
  const reqId = ctx.get("requestId");
  const body = await ctx.req.json();
  const id: number = body.id;
  const game = await rawg.get(id, reqId);
  console.log(`[${reqId}] ${id} - ${game.name}`)
  return ctx.json(game)
})

app.post("/search", async (ctx) => {

  const reqId = ctx.get("requestId");
  const body = await ctx.req.json();
  const title: string = body.title;
  const games = await rawg.search(title, reqId);
  console.log(`[${reqId}] ${title} - ${games.map(g => g.id)} (${games.length})`)
  return ctx.json(games)
})

Deno.serve(app.fetch)