require('dotenv').config();
import { getSundayServiceVideoUrl } from './facebookApi';
import { downloadVideo } from './downloadVideo';

export async function uploadVideo(event: any) {
	const url = await getSundayServiceVideoUrl();
	console.log(url);
	if (!url) {
		throw new Error('Url is undefined');
	}

	await downloadVideo(url, 'temp');
}
