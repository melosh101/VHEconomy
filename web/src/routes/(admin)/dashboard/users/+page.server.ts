import { db } from '$lib/server/db';
import { user, teams, roles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const allUsers = await db.query.user.findMany({
		with: {
			team: true,
			role: true
		}
	});
	const allTeams = await db.query.teams.findMany();
	const allRoles = await db.query.roles.findMany();

	return {
		users: allUsers,
		teams: allTeams,
		roles: allRoles
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const name = data.get('name') as string;
		const ign = data.get('ign') as string;
		const teamId = data.get('teamId') as string;
		const roleId = data.get('roleId') as string;
		const isAdmin = data.get('isAdmin') === 'on';

		if (!id) return fail(400, { message: 'Missing ID' });

		await db
			.update(user)
			.set({
				name,
				ign,
				teamId: teamId || null,
				roleId: roleId || null,
				isAdmin
			})
			.where(eq(user.id, id));

		return { success: true };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { message: 'Missing ID' });
		await db.delete(user).where(eq(user.id, id));
		return { success: true };
	}
};
