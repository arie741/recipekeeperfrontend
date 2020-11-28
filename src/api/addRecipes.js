import React,  { useState, useEffect } from 'react';
import axios from 'axios';

export default async function addRecipes(name, type, photos, description, steps,ingredients){
	let formData = new FormData();

	formData.append('name', name);
	formData.append('type', type);
	for (let i=0; i<photos.length;i++){
		formData.append('photos', photos[i]);
	}
	formData.append('description', description);
	for (let j=0; j<steps.length;j++){
		formData.append('steps', steps[j]);
	}
	
	for (let k=0; k<ingredients.length;k++){
		formData.append('ingredients', JSON.stringify(ingredients[k]));
	}
	let response = await axios.post('http://localhost:3000/addrecipes', formData, {
				    headers: {
				      'Content-Type': 'multipart/form-data'
				    }});

	return response;
} 