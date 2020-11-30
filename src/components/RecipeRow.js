import React from 'react';

function RecipeRow(props){
	return(
			<div className="d-flex flex-row reciperow" onClick={() => props.onClickHandle(props.data.uid)}>
				<img src={props.data.photos === null || props.data.photos.photos[0] === undefined ?  (process.env.REACT_APP_IMG_SOURCE + '/foodplaceholder.png') : (process.env.REACT_APP_IMG_SOURCE + props.data.photos.photos[0])} alt=""/>
				<div>{props.data.name}</div>
				<div>{props.data.description}</div>
			</div>	
		)
}

export default RecipeRow;