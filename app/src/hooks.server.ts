import { cb, db } from '$lib/server';

import type { Handle } from '@sveltejs/kit';
import type { DiffusionUser } from './app';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	if (!session || session == '') {
		return await resolve(event);
	}
	const user = await cb.getUserInfo(session) as DiffusionUser;
	if (!user || !user.id || user.id == '') {
		event.cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});
		return resolve(event);
	}
	let localUser = await db.diffusionUser.findUnique({
		where: {
			id: user.id
		}
	})
	if (!localUser) {
		localUser = await db.diffusionUser.create({
			data: {
				id: user.id,
				username: user.name,
				avatar: user.avatar,
				banner: user.banner,
			}
		})
	}
	user.hordeKey = localUser.hordeKey;
	event.locals.user = user;
	return await resolve(event);
};
