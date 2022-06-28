import https from 'https';
import fs from 'fs';
import { IncomingMessage } from 'http';

function promiseGet(url) {
	return new Promise<IncomingMessage>((resolve, reject) => {
		const request = https.get(url, resolve);
		request.on('error', (error) => reject(error))
	});
}

export async function downloadVideo(url: string, name: string): Promise<void> {
	return new Promise(async (resolve, reject) => {
		const response = await promiseGet(url);
		if (response.statusCode >= 299) {
			reject(new Error(`Request failed ${response.statusCode} ${response.statusMessage}`));
		}

		const contentType = response.headers['content-type'];
		if (!contentType || !contentType.startsWith('video/')) {
			reject(new Error('Content is not a video'));
		}

		const type = contentType.split('/')[1];
		const file = fs.createWriteStream(`${name}.${type}`);
		response.pipe(file);
		file.on('finish', () => {
			file.close();
			resolve();
		});
		file.on('error', (error) => reject(error));
	})
}
