import { redirect } from "@sveltejs/kit"
import { CARDBOARD_URL } from "$env/static/private"
export const load = async ({ locals }) => {
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, CARDBOARD_URL)
	}
}