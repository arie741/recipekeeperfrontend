import axios from 'axios';

export default async function editRecipe(name, type, photos, description, steps, ingredients, uid){
	let formData = new FormData();

	formData.append('name', name);
	formData.append('type', type);
	for (let i=0; i<photos.length;i++){
		formData.append('photos', photos[i]);
	}
	formData.append('description', description);
	formData.append('steps', JSON.stringify(steps));
	formData.append('ingredients', JSON.stringify(ingredients));
	formData.append('uid', uid);

	let response = await axios.put(process.env.REACT_APP_FETCH_SOURCE + '/editrecipe', formData, {
				    headers: {
				      'Content-Type': 'multipart/form-data'
				    }});

	return response;
} 