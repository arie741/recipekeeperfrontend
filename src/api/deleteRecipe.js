import axios from 'axios';

export default async function deleteRecipe(uid){
	let requestBody = JSON.stringify({
		uid
	})
	let response = await axios.post(process.env.REACT_APP_FETCH_SOURCE + '/deleteRecipe', requestBody, {
		headers: {
			'Content-Type' : 'application/json'
		}
	});
	
	return response;
} 