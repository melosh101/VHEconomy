import { drizzle } from 'drizzle-orm/bun-sqlite';
import {Database} from 'bun:sqlite';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { seedDB } from '$lib/server/db/seed';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);

export const db = drizzle(client, { schema });

const checkItem = await db.query.items.findFirst();

if (!checkItem && !process.env.DRIZZLE_KIT) {
	console.log("seeding db")
	await seedDB();
} else {
	console.log("db doesnt need a seed :D")
}
