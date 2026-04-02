import seedData from "../../../../static/staticData.json"
import { db } from '$lib/server/db/index';
import { itemCategory, items } from '$lib/server/db/schema';

const categories = Object.keys(seedData);

export async function seedDB() {
	for (const category of categories) {

		await db.transaction(async (tx) => {
			const cat = await db
				.insert(itemCategory)
				.values({
					title: category
				})
				.returning();

			if (!cat[0]) return tx.rollback();

			for (const i of seedData[category as keyof typeof seedData]) {
				const item = i as {
					img: string;
					item: string;
					amounts: string;
					scale: string;
					weight: string;
					variations?: string[];
				};


				await tx.insert(items).values({
					item: item.item,
					img: item.img,
					amounts: item.amounts,
					variations: item.variations,
					scale: Number.parseFloat(item.scale),
					weight: Number.parseFloat(item.weight),
					categoryId: cat[0].id
				});
			}
		});

	}
}