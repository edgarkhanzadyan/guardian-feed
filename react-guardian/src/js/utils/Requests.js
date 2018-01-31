const apiKey = '8529bd81-140b-43b4-997f-9c496b47f3e7';

export const getFeed = ({ pageIndex }) =>
	fetch(`https://content.guardianapis.com/search?show-fields=thumbnail&page=${pageIndex}&api-key=${apiKey}`);

// export const getPostData = async ({postId}) =>
// 	await fetch(`https://content.guardianapis.com/${postId}?show-fields=thumbnail&api-key=${apiKey}`);
