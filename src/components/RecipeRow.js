import React from 'react';

function RecipeRow(props){
	const parseCategory = (cat) => {
		switch(cat){
			case 'maincourse':
				return 'Main Course';
				break;
			case 'drink':
				return 'Drink';
				break;
			case 'dessert':
				return 'Dessert';
				break;
			case 'appetizer':
				return 'Appetizer';
				break;
			default:
		}
	}

	return(
			<div className="d-flex flex-row reciperow" onClick={() => props.onClickHandle(props.data.uid)}>
				<img src={props.data.photos === null || props.data.photos.photos[0] === undefined ?  (process.env.REACT_APP_IMG_SOURCE + '/foodplaceholder.png') : (process.env.REACT_APP_IMG_SOURCE + props.data.photos.photos[0])} alt=""/>
				<div className="d-flex flex-column recipe-container">
					<div className="flex-row d-flex justify-content-between recipe-title">
						<h5>{props.data.name}</h5>
						<div className="recipe-category">{parseCategory(props.data.type)}</div>
					</div>
					<div className="recipe-desc">{props.data.description}</div>
				</div>
			</div>	
		)
}

export default RecipeRow;