import { IMAGE_PLACEHOLDER } from './Constants';
import uuid from 'uuid/v4';

export const createValidPostObject = post => ({
	id: post.id,
	uuid: uuid(),
	title: post.webTitle,
	category: post.sectionName,
	image: (post.fields && post.fields.thumbnail) ? post.fields.thumbnail : IMAGE_PLACEHOLDER,
	postDataUrl: post.apiUrl
});

export const createValidNewsArray = news => 
	news.map(createValidPostObject);

export const spawnNotification = body => {
	const options = { body };
	new Notification("New Post", options);
}
