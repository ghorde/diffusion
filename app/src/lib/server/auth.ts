import { CARDBOARD_SECRET, CARDBOARD_TOKEN } from '$env/static/private';
import { Cardboard } from 'cardboard.js';

if (!CARDBOARD_TOKEN) {
	throw new Error('Missing Cardboard Token');
}

if (!CARDBOARD_SECRET) {
	throw new Error('Missing Cardboard Secret');
}

export const cb = new Cardboard(CARDBOARD_TOKEN, CARDBOARD_SECRET);
