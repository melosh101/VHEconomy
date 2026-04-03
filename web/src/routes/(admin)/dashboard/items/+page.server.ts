import { db } from '$lib/server/db';
import { items, itemCategory, teams } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const allItems = await db.query.items.findMany({
		with: {
			category: true,
			team: true
		}
	});
	const allCategories = await db.query.itemCategory.findMany();
	const allTeams = await db.query.teams.findMany();

	return {
		items: allItems,
		categories: allCategories,
		teams: allTeams
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const item = data.get('item') as string;
		const img = data.get('img') as string;
		const amounts = data.get('amounts') as string;
		const scale = parseInt(data.get('scale') as string);
		const weight = parseInt(data.get('weight') as string);
		const categoryId = data.get('categoryId') as string;
		const teamId = data.get('teamId') as string;
		const automated = data.get('automated') === 'on';

		if (!item || isNaN(scale) || isNaN(weight)) return fail(400, { message: 'Missing data' });

		await db.insert(items).values({
			item,
			img: img || '',
			amounts: amounts || '[]',
			scale,
			weight,
			categoryId: categoryId || null,
			teamId: teamId || null,
			automated
		});
		return { success: true };
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const item = data.get('item') as string;
		const img = data.get('img') as string;
		const amounts = data.get('amounts') as string;
		const scale = parseInt(data.get('scale') as string);
		const weight = parseInt(data.get('weight') as string);
		const categoryId = data.get('categoryId') as string;
		const teamId = data.get('teamId') as string;
		const automated = data.get('automated') === 'on';

		if (!id) return fail(400, { message: 'Missing ID' });

		await db
			.update(items)
			.set({
				item,
				img,
				amounts,
				scale,
				weight,
				categoryId: categoryId || null,
				teamId: teamId || null,
				automated
			})
			.where(eq(items.id, id));

		return { success: true };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { message: 'Missing ID' });
		await db.delete(items).where(eq(items.id, id));
		return { success: true };
	}
};
