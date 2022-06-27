require('dotenv').config();
import { getSundayServiceVideoUrl } from './facebookApi';

export async function uploadVideo(event: any) {
	const url = await getSundayServiceVideoUrl();
	console.log(url);
}
