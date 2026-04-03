import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(303, '/login');
	}

	const dbUser = await db.query.user.findFirst({
		where: eq(user.id, locals.user.id)
	});

	if (!dbUser || !dbUser.isAdmin) {
		redirect(303, '/');
	}

	return {
		user: dbUser,
		session: locals.session
	};
};
