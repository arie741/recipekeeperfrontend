import React,  { useState, useEffect } from 'react';
import axios from 'axios';

export default async function getRecipes(){
	let response = await axios.get('http://localhost:3000/getrecipes');

	let result = await response.data;
	
	return result;
} 