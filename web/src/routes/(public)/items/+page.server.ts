import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allItems = await db.query.items.findMany({
		with: {
			category: true,
			team: true
		}
	});

	return {
		items: allItems
	};
};
