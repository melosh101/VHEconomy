import { db } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const teams = await db.query.teams.findMany({
    with: {
      items: true,
      players: true
    }
  })

  return {
    teams,
  }
}
