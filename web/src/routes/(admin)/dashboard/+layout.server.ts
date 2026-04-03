import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user, session } = await parent();
	return {
		user,
		session
	};
};
