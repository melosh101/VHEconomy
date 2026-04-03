// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // If you don't return it here, page.data.user will be undefined
  return {
    user: locals.user,
    session: locals.session
  };
};
