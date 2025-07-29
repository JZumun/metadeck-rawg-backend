import { Hono } from '@hono/hono'
import { logger } from '@hono/hono/logger'
import { cors } from "@hono/hono/cors"
import * as rawg from "./src/rawg/mod.ts";

const app = new Hono()

app.use(logger());
app.use(cors({
  origin: Deno.env.get("CORS_ORIGIN")!
}))

app.post("/get", async (ctx) => {
  const body = await ctx.req.json();
  const id: number = body.id;
  const game = await rawg.get(id);
  console.log(`${id} - ${game.title}`)
  return ctx.json(game)
})

app.post("/search", async (ctx) => {
  const body = await ctx.req.json();
  const title: string = body.title;
  const games = await rawg.search(title);
  console.log(`${title} - ${games.map(g => g.id)} (${games.length})`)
  return ctx.json(games)
})

Deno.serve(app.fetch)