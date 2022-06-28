import fetch from 'node-fetch';
import { isSunday } from 'date-fns';

export async function getSundayServiceVideoUrl(): Promise<string> {
	const rawResponse = await fetch(
		`https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/feed?fields=attachments{media_type,media},story,story_tags,created_time&access_token=${process.env.FACEBOOK_PAGE_TOKEN}`
	);

	if (rawResponse.status >= 299) {
		throw new Error(`Could not fetch page feed (${rawResponse.statusText})\n\n${await rawResponse.text()}`);
	}

	const jsonResponse = await rawResponse.json();

	return jsonResponse
		.data
		.find((x) => x.story === 'Branches Fullerton was live.')
		?.attachments
		.data
		.find((x) => x.media_type === 'video')
		?.media
		.source as string;
}
