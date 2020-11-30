import axios from 'axios';

export default async function getRecipe(uid){
	let response = await axios.get(process.env.REACT_APP_FETCH_SOURCE + '/getrecipe/' + uid);

	let result = await response.data;
	
	return result;
} 