// See https://kit.svelte.dev/docs/types#app

import type { GuildedUser } from 'cardboard.js';

export interface DiffusionUser extends GuildedUser {
	hordeKey?: string;
}

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: DiffusionUser;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
