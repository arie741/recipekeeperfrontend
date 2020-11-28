import React from 'react';

function RecipeRow(props){
	return(
			<div className="d-flex flex-row reciperow">
				<img src={props.data.photos !== null || props.data.photos[0] !== undefined ? ('http://localhost:3000/photos/' + props.data.photos.photos[0]) : ''} alt=""/>
				<div>{props.data.name}</div>
				<div>{props.data.description}</div>
			</div>	
		)
}

export default RecipeRow;