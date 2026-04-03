// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // If you don't return it here, page.data.user will be undefined
  console.log(locals.user)
  if (!locals.user || !locals.user?.idAdmin) {
    redirect(303, "/")
  }
  return {
    user: locals.user,
    session: locals.session
  };
};
