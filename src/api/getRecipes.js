import axios from 'axios';

export default async function getRecipes(){
	let response = await axios.get(process.env.REACT_APP_FETCH_SOURCE + '/getrecipes');

	let result = await response.data;
	
	return result;
} 