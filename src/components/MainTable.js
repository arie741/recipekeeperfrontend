import React,  { useState, useEffect } from 'react';
import RecipeRow from './RecipeRow';
import getRecipes from '../api/getRecipes';
import addRecipes from '../api/addRecipes';
import AddModal from './AddModal';

function MainTable(){
	const [recipes, setRecipes] = useState([]);
	const [submitting, isSubmitting] = useState(false);

	useEffect(() => {
		getRecipes().then(response => {
			setRecipes(response);
			isSubmitting(false);
		})
	}, [submitting]);

	return(
			<div className="container">
				<AddModal onAddRecipe={(val) => isSubmitting(val)}/>
				{recipes.map(recipe => 
					<RecipeRow data={recipe} key={recipe.uid}/>	
					)}
			</div>	
		)
}

export default MainTable;