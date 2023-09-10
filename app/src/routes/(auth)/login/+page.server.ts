import { cb } from '$lib/server';
import { redirect } from '@sveltejs/kit';
export const load = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (!code) {
		throw redirect(302, '/');
	}

	const at = await cb.exchangeInitialToken(code);

	if (!at) {
		throw redirect(302, '/');
	}

	cookies.set('session', at.access_token, {
		path: '/',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		httpOnly: true,
		sameSite: 'lax'
	});

	throw redirect(302, '/');
};
