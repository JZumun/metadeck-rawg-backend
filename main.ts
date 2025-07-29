import { Hono } from '@hono/hono'
import * as rawg from "./src/rawg/mod.ts";

const app = new Hono()

app.post("/get", async (ctx) => {
  const body = await ctx.req.json();
  const id: number = body.id;
  const game = await rawg.get(id);
  return ctx.json(game)
})

app.post("/search", async (ctx) => {
  const body = await ctx.req.json();
  const title: string = body.title;
  const games = await rawg.search(title);
  return ctx.json(games)
})

Deno.serve(app.fetch)