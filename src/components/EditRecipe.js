import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import StepsInputs from './StepsInputs';
import IngredientsInput from './IngredientsInput';
import editRecipe from '../api/editRecipe';
import getRecipe from '../api/getRecipe';
import deleteImage from '../api/deleteImage';
import { useHistory } from 'react-router-dom';

export default function EditRecipe(props){
	const [recipe, setRecipe] = useState([]);
	const { register, handleSubmit, setValue } = useForm();
	const [deletingImage, setDeletingImage] = useState(false);
	const history = useHistory();

	let photos = recipe?.photos || {photos: []};

	function getData(){
		getRecipe(props.recipeId).then(response => {
			setRecipe(response);
			setValue('name', response.name);
			setValue('type', response.type);
			setValue('description', response.description);
			setValue('steps', response.steps);
			setValue('ingredients', response.ingredients); 
		})
	}
	
	useEffect(() => {
		getData()
		setDeletingImage(false);
	}, [deletingImage]);

	const onSubmit = (data) => {
		
		let ingredients = [];

		for(let i=0; i < data.ingre.length; i++){
			ingredients.push({
				id: data.ingId[i],
				name: data.ingre[i],
				qty: data.qty[i]
			})
		}

		editRecipe(data.name, data.type, data.addphotos, data.description, data.steps, ingredients, props.recipeId).then(response => {
			history.push("/");
		})
	}

	const onDeleteImageHandler = (uid, photo) => {
		deleteImage(uid, photo).then(response => {
			setDeletingImage(true);
		})
	}

	const cancelHandle = () => {
		history.push("/");
	}

	return (
			<div className="content-wrapper">	
				<form className="formInput edit-row" onSubmit={handleSubmit(onSubmit)}>
		            <div className="row">
		            	<div className="d-flex flex-column col-lg-6">
			            	<div className="input-group">
							    <div className="input-group-prepend">
							     	<span className="input-group-text" id="">Name</span>
							    </div>
							    <input className="form-control" type="text" name="name" ref={register} placeholder="name"/>	
							</div>
			            	
			            </div>
		            </div>
		            <div className="row">
		            	<div className="col-lg-10">
			            	<div className="input-select">
			            		<h4>Category</h4>
			            		<select name="type" ref={register} id="type">
								  <option value="maincourse">Main Course</option>
								  <option value="dessert">Dessert</option>
								  <option value="appetizer">Appetizer</option>
								  <option value="drinkdrink">Drink</option>
								</select>
			            	</div>

			            	<h4 className="photos-h">Photos</h4>
							<div className="photos-row d-flex flex-row">
								{photos.photos.length === 0 ? <div>No photos yet</div> : ''}
						    	{photos.photos.map((item, index) => 
						    			<div className="d-flex flex-row" key={'photos' + index}>
						    				<img className="photosThumb" src={process.env.REACT_APP_IMG_SOURCE + item} alt={(process.env.REACT_APP_IMG_SOURCE + '/foodplaceholder.png')}/>
						    				<button type="button" onClick={() => onDeleteImageHandler(props.recipeId, item)}> Delete </button>
						    			</div>	
						    		)
						    	}
							</div>	
							<div className="photos-row">
								<h5 className="photos-h">Add More photos</h5>
								<input type="file" name="addphotos" ref={register} placeholder="photos" encType="multipart/form-data" multiple/>
							</div>	
							<div className="input-group desc-row">
								<div className="input-group-prepend">
								    <span className="input-group-text" id="">Description</span>
								</div>
								<input className="form-control" type="text" name="description" ref={register}  placeholder="description"/>	
							</div>
							
							<div>
								<h4>
									Ingredients
								</h4>
								<IngredientsInput refFunc={register} initialValue={recipe.ingredients}/>	
							</div>
							<div>
								<h4>
									Steps
								</h4>
								<StepsInputs refFunc={register} initialValue={recipe.steps}/>
							</div>
		            	</div>
		            </div>
		            <div className="flex-row-reverse d-flex button-row">
						<button className="btn btn-secondary" onClick={() => cancelHandle()} type="button">Cancel</button>
						<input className="btn btn-primary" type="submit" value="Edit Recipe"/>
					</div>
		        </form>		
			</div>
		)
}