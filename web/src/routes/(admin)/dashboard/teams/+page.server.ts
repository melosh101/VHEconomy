import { db } from '$lib/server/db';
import { teams } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const allTeams = await db.query.teams.findMany();
	return { teams: allTeams };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const color = data.get('color') as string;

		if (!name) return fail(400, { message: 'Missing Name' });

		await db.insert(teams).values({ name, color });
		return { success: true };
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const name = data.get('name') as string;
		const color = data.get('color') as string;

		if (!id) return fail(400, { message: 'Missing ID' });

		await db.update(teams).set({ name, color }).where(eq(teams.id, id));

		return { success: true };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { message: 'Missing ID' });
		await db.delete(teams).where(eq(teams.id, id));
		return { success: true };
	}
};
