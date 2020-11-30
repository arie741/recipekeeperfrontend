import React from 'react';
import Modal from 'react-modal';
import {
  Link
} from "react-router-dom";

export default function DetailsModal(props){	
	let photos = props.data?.photos || {photos: []};
	let steps = props.data?.steps || {steps: []};
	let ingredients = props.data?.ingredients || {ingredients: []};

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
		    <div className="d-flex flex-column">
		    	<h3>{props.data.name}</h3>
		    	<div>{props.data.type}</div>
		    	<h4>Photos</h4>
		    	{photos.photos.length === 0 ? <div>No photos yet</div> : ''}
		    	{photos.photos.map((item, index) => 
		    			<img className="photosThumb" key={'photos' + index} src={process.env.REACT_APP_IMG_SOURCE + item} alt={(process.env.REACT_APP_IMG_SOURCE + '/foodplaceholder.png')}/>
		    		)
		    	}
		    	<div>{props.data.description}</div>
		    	<h4>Ingredients</h4>
		    	{ingredients.ingredients.map((item) => 
		    		<div key={item.id} className="d-flex flex-row">
		    			<div>{item.name}</div>
		    			<div>{item.qty}</div>
		    		</div>		    		
		    	)}
		    	<h4>Steps</h4>
		    	{steps.steps.map((item, index) => 
		    		<div key={index}>{index+1}. {item}</div>
		    	)}

		    	<div className="flex-row d-flex">
		    		<Link to={"/editrecipe/" + props.data.uid}>Edit Recipe</Link>
		    		<button type="button" onClick={() => onDeleteHandle()}>Delete</button>
		    	</div>
		    </div>
		</Modal>
		)
}