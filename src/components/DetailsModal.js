import React from 'react';
import Modal from 'react-modal';
import {
  Link
} from "react-router-dom";

export default function DetailsModal(props){	
	let photos = props.data?.photos || {photos: []};
	let steps = props.data?.steps || {steps: []};
	let ingredients = props.data?.ingredients || {ingredients: []};

	const parseCategory = (cat) => {
		switch(cat){
			case 'maincourse':
			return 'Main Course'
			case 'drink':
			return 'Drink'
			case 'dessert':
			return 'Dessert'
			case 'appetizer':
			return 'Appetizer'
			break;
			default:
		}
	}

	function onDeleteHandle(){
		props.deleteHandle(props.data.uid);
		props.modalHandle(false);
	}

	return (
		<Modal
		    isOpen={props.isOpen}
		    onRequestClose={() => props.modalHandle(false)}
		    contentLabel="Add Recipe Modal"
		    ariaHideApp={false}
		    >
		    <div className="d-flex flex-column recipe-details">
		    	<div className="d-flex flex-row">
		    		<h3>{props.data.name}</h3>
		    		<div className="recipe-category">{parseCategory(props.data.type)}</div>
		    		<button className="btn btn-secondary close-button" type="button" onClick={() => props.modalHandle(false)}>X</button>
		    	</div>
		    	<div className="photos-row">
			    	{photos.photos.length === 0 ? <div>No photos yet</div> : ''}
			    	{photos.photos.map((item, index) => 
			    			<img className="photosThumb" key={'photos' + index} src={process.env.REACT_APP_IMG_SOURCE + item} alt={(process.env.REACT_APP_IMG_SOURCE + '/foodplaceholder.png')}/>
			    		)
			    	}
		    	</div>
		    	<div>{props.data.description}</div>
		    	<div className="recipe-ingredients">
		    		<h4>Ingredients</h4>
			    	{ingredients.ingredients.map((item, index) => 
			    		<div key={item.id} className="d-flex flex-row">
			    			<div className="ingre-name">{index+1}. {item.name}</div>
			    			<div className="ingre-qty">{item.qty}</div>
			    		</div>		    		
			    	)}
		    	</div>
		    	<div className="recipe-steps">
		    		<h4>Steps</h4>
			    	{steps.steps.map((item, index) => 
			    		<div key={index}>{index+1}. {item}</div>
			    	)}
		    	</div>	

		    	<div className="flex-row-reverse d-flex button-row">
		    		<button className="btn btn-danger" type="button" onClick={() => onDeleteHandle()}>Delete</button>
		    		<Link className="btn btn-primary" to={"/editrecipe/" + props.data.uid}>Edit Recipe</Link>
		    	</div>
		    </div>
		</Modal>
		)
}