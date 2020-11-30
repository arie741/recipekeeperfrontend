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
			<div>	
				<form className="formInput" onSubmit={handleSubmit(onSubmit)}>
		            <div className="d-flex flex-column">
		            	<input type="text" name="name" ref={register} placeholder="name"/>	
						<select name="type" ref={register} id="type">
						  <option value="maincourse">Main Course</option>
						  <option value="dessert">Dessert</option>
						  <option value="appetizer">Appetizer</option>
						  <option value="drinkdrink">Drink</option>
						</select>
						{photos.photos.length === 0 ? <div>No photos yet</div> : ''}
				    	{photos.photos.map((item, index) => 
				    			<div className="d-flex flex-row" key={'photos' + index}>
				    				<img className="photosThumb" src={process.env.REACT_APP_IMG_SOURCE + item} alt={(process.env.REACT_APP_IMG_SOURCE + '/foodplaceholder.png')}/>
				    				<button type="button" onClick={() => onDeleteImageHandler(props.recipeId, item)}> Delete </button>
				    			</div>	
				    		)
				    	}
						<input type="file" name="addphotos" ref={register} placeholder="photos" encType="multipart/form-data" multiple/>	
						<input type="text" name="description" ref={register}  placeholder="description"/>	
						<IngredientsInput refFunc={register} initialValue={recipe.ingredients}/>	
						<StepsInputs refFunc={register} initialValue={recipe.steps}/>
						<button onClick={() => cancelHandle()} type="button">Cancel</button>
						<input type="submit" value="Edit Recipe"/>
		            </div>
		        </form>		
			</div>
		)
}