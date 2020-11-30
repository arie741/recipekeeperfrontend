import axios from 'axios';

export default async function deleteImage(uid, photo){
	let requestBody = JSON.stringify({
		uid,
		photo
	})
	let response = await axios.post(process.env.REACT_APP_FETCH_SOURCE + '/deleteimage', requestBody, {
		headers: {
			'Content-Type' : 'application/json'
		}
	});
	
	return response;
} 