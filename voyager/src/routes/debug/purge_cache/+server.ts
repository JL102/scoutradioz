import utilities from '$lib/server/utilities';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	await utilities.flushCache();
	return json();
};